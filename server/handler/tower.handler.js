import { gameAssets } from '../init/assets.js';
import { getTower, setTowerAttackLog, setRefundTower, setTower } from '../models/tower.model.js';
import { getUserById } from '../models/user.model.js';
import { v4 } from 'uuid';
import findOpponent from '../util/find.opponent.js';
import { getMonsterById, removeMonster } from '../models/monster.model.js';
import { killMonster } from './monster.handler.js';

export const buyTower = (userId, payload, socket, io) => {
  //타워의 가격 비교
  const { x, y } = payload;

  const serverTime = Date.now(); // 현재 타임스탬프

  const userGameState = getUserById(userId);

  if (userGameState.userGold < userGameState.towerCost) {
    socket.emit('error', '돈이 부족합니다');
    return { status: 'failed', message: '타워 구매 실패' };
  }

  userGameState.userGold -= userGameState.towerCost;
  const uuid = v4(); //uuid 생성문인데, 인자로 전달하는 값의 변수를 uuid로 하기 위해 그냥 이렇게 함..
  // 업데이트된 게임 상태를 클라이언트에 전송
  socket.emit('updateGameState', {
    userGold: userGameState.userGold,
  });
  socket.emit('makeTower', {
    x,
    y,
    uuid,
  });
  io.to(findOpponent(socket)).emit('opponentMakeTower', {
    //적에게 타워 생성 데이터 보냄
    x,
    y,
    uuid,
  });
  const power = 40; // 1레벨 타워의 공격력 정보

  //타워의 데이터 저장
  const tower = setTower(userId, x, y, 1, uuid, power, serverTime);
  console.log('타워 구입됨', tower.towerId);

  return { status: 'success', message: '타워 구매 완료' };
};

export const attackTower = (userId, payload, socket, io) => {
  const { towerId, monsterId } = payload;
  const serverTime = Date.now(); // 현재 타임스탬프

  const opponent = findOpponent(socket);

  const tower = getTower(userId, towerId);
  //타워의 데이터 찾기. 현재 때린 타워의 ID를 기반으로 저장된 타워를 찾는다.
  if (!tower) {
    //해당 Id의 타워가 존재하는지 체크
    console.error('타워 정보를 찾지 못했습니다', tower);
    return;
  }

  const monster = getMonsterById(userId, monsterId);
  //몬스터 정보도 가지고 온다

  if (!monster) {
    //해당 ID의 몬스터가 존재하는지 체크
    console.log('몬스터 정보가 존재하지 않습니다. 공격을 무효화 합니다');
    return;
  }

  //타워 -> 몬스터 공격처리 및 사망처리
  monster.hp = monster.hp - tower.power;
  if (monster.hp < 0) {
    //사망처리
    killMonster(userId, socket); //몬스터 사망시 점수,돈,레벨(스테이지) 변경해주는 함수
    removeMonster(userId, monsterId); //몬스터 제거시 배열에서 삭제하는 함수
    socket.emit('monsterDead', { monsterId: monsterId });
    io.to(opponent).emit('opponentMonsterDead', { monsterId: monsterId });
  } else {
    // 데미지 이벤트 전송
    socket.emit('towerAttack', { monsterId: monsterId, hp: monster.hp });
    io.to(opponent).emit('opponentTowerAttack', { monsterId: monsterId, towerId: tower.towerId });
  }

  setTowerAttackLog(userId, towerId, monsterId, tower.power, serverTime); //공격에 대한 정보를 서버에 저장

  return { status: 'success', message: 'towerAttack' };
};

export const refundTower = (userId, payload, socket) => {
  const towers = getTower(userId);

  //타워의 데이터 찾기 현재 때린 타워의 ID를 기반으로 저장된 타워를 찾는다.
  const tower = towers.find((data) => data.id === payload.towerId);

  //해당 Id의 타워가 존재하는지 체크
  if (!tower) {
    return { status: 'fail', message: 'There is No Tower' };
  }

  // 해당 위치의 타워가 존재하는지 체크
  if (tower.position.x != payload.towerpos.x && tower.position.y != payload.towerpos.y) {
    return { status: 'fail', message: 'Position is Not Matching' };
  }

  const userGameState = getUserById(userId);

  userGameState.userGold += Math.floor(userGameState.towerCost * (1 / 2));

  // 업데이트된 게임 상태를 클라이언트에 전송
  socket.emit('updateGameState', {
    userGold: userGameState.userGold,
  });

  const serverTime = Date.now(); // 현재 타임스탬프

  setRefundTower(userId, payload.towerId, serverTime);

  return { status: 'success', message: '타워 환불 완료' };
};

export const upgradeTower = (userId, payload, socket) => {
  const towers = getTower(userId);

  //타워의 데이터 찾기 현재 때린 타워의 ID를 기반으로 저장된 타워를 찾는다.
  const tower = towers.find((data) => data.id === payload.towerId);

  //해당 Id의 타워가 존재하는지 체크
  if (!tower) {
    return { status: 'fail', message: 'There is No Tower' };
  }

  // 해당 위치의 타워가 존재하는지 체크
  if (tower.position.x != payload.towerpos.x && tower.position.y != payload.towerpos.y) {
    return { status: 'fail', message: 'Position is Not Matching' };
  }

  const updateRate = towerData.data.find((tower) => tower.level === payload.level);
  const updateCost = towerData.data.find((tower) => tower.level + 1 === payload.level + 1);

  if (!updateCost) {
    return { status: 'fail', message: '없는 강화 정보값입니다.' };
  }

  const userGameState = getUserById(userId);

  if (userGameState.userGold < updateCost.upgradeCost) {
    return {
      status: 'fail',
      message: `강화 골드가 ${updateCost.upgradeCost - userGameState.userGold}만큼 부족합니다.`,
    };
  }

  const nowRate = Math.floor(Math.random() * 100 + 1);

  if (updateRate.upgradeRate <= nowRate) {
    return {
      status: 'fail',
      message: `강화가 실패하였습니다. 강화 확률 : ${updateRate.upgradeRate}`,
    };
  }

  userGameState.userGold -= updateCost.upgradeCost;
  const nowlevel = payload.level++;
  // 업데이트된 게임 상태를 클라이언트에 전송
  socket.emit('updateGameState', {
    userGold: userGameState.userGold,
  });

  socket.emit('updateTowerState', {
    towerId: payload.towerId,
    towerLevel: nowlevel,
  });

  tower.level = tower.level + 1;

  return {
    status: 'success',
    message: '타워 강화 성공!',
  };
};
