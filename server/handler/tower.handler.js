import { getTower, setTowerAttackLog, setRefundTower, setTower } from '../models/tower.model.js';
import { getUserById } from '../models/user.model.js';
import { v4 } from 'uuid';
import { findOpponent } from '../util/find.opponent.js';
import { getMonsterById, removeMonster } from '../models/monster.model.js';
import { killMonster } from './monster.handler.js';
import CustomError from '../util/error/customError.js';
import { handleError } from '../util/error/errorHandler.js';
import { ErrorCodes } from '../util/error/errorCodes.js';
import { setLog } from '../db/log/log.db.js';

export const buyTower = (userId, payload, socket, io) => {
  try {
    const { x, y } = payload;

    const serverTime = Date.now(); // 현재 타임스탬프

    const userGameState = getUserById(userId);

    if (userGameState.userGold < userGameState.towerCost) {
      throw new CustomError(ErrorCodes.NOT_ENOUGH_GOLD, '골드가 부족합니다.');
    }

    userGameState.userGold -= userGameState.towerCost;
    const uuid = v4();
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
      x,
      y,
      uuid,
    });
    const power = 40;

    //타워의 데이터 저장
    const tower = setTower(userId, x, y, 1, uuid, power, serverTime);
    console.log('타워 구입됨', tower.towerId);
  } catch (error) {
    // setLog(userId, error.message); // 테스트용
    handleError(socket, error);
  }
};

export const attackTower = (userId, payload, socket, io) => {
  try {
    const { towerId, monsterId } = payload;
    const serverTime = Date.now(); // 현재 타임스탬프

    const opponent = findOpponent(socket);

    const tower = getTower(userId, towerId);
    //타워의 데이터 찾기. 현재 때린 타워의 ID를 기반으로 저장된 타워를 찾는다.
    if (!tower) {
      //해당 Id의 타워가 존재하는지 체크
      throw new CustomError(ErrorCodes.TOWER_NOT_FOUND, '타워 정보를 찾을 수 없습니다.');
    }

    const monster = getMonsterById(userId, monsterId);
    //몬스터 정보도 가지고 온다

    if (!monster) {
      //해당 ID의 몬스터가 존재하는지 체크
      console.log('몬스터 정보가 존재하지 않습니다. 공격을 무효화 합니다');
      return;
    }

    //타워 -> 몬스터 공격처리 및 사망처리
    monster.hp -= tower.power;
    if (monster.hp <= 0) {
      //사망처리
      killMonster(userId, socket); //몬스터 사망시 점수,돈,레벨(스테이지) 변경해주는 함수
      removeMonster(userId, monsterId); //몬스터 제거시 배열에서 삭제하는 함수
      socket.emit('monsterDead', { monsterId: monsterId });
      io.to(opponent).emit('opponentTowerAttack', { monsterId: monsterId, towerId: tower.towerId });
      io.to(opponent).emit('opponentMonsterDead', { monsterId: monsterId, timeStamp: payload.timeStamp });
    } else {
      // 데미지 이벤트 전송
      socket.emit('towerAttack', { monsterId: monsterId, hp: monster.hp });
      io.to(opponent).emit('opponentTowerAttack', { monsterId: monsterId, towerId: tower.towerId });
    }

    setTowerAttackLog(userId, towerId, monsterId, tower.power, serverTime); //공격에 대한 정보를 서버에 저장
  } catch (error) {
    setLog(userId, error.message);
    handleError(socket, error);
  }
};
