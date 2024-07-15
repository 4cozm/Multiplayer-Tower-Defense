import { getGameAssets } from '../init/assets.js';
import { addMonster, getSpawnMonster, removeMonster } from '../models/monster.model.js';
import { setBaseHp, getBaseHp } from '../models/monster.model.js';
import { setLevel, getLevel } from '../models/monster.model.js';
import { getUserById } from '../models/user.model.js';
import { v4 as uuidv4 } from 'uuid';
import findOpponent from '../util/find.opponent.js';

export const spawnMonster = (userId, _, socket, io) => {
  const opponent = findOpponent(socket);
  const { levelsData } = getGameAssets();

  const stage = getLevel(userId);
  console.log('stage', stage);

  const levelData = levelsData.data.find((data) => data.stage === stage);

  if (!levelData) {
    throw new Error('해당 레벨을 찾을 수 없습니다.');
  }
  const { stage: monsterLevel, hp: monsterHp, power: monsterPower } = levelData;
  const monsterID = uuidv4();
  const monsterNumber = Math.floor(Math.random() * 5);

  addMonster(userId, monsterID, monsterHp, monsterPower);

  socket.emit('spawnMonster', { monsterLevel, monsterID, monsterHp, monsterPower, monsterNumber });
  io.to(opponent).emit('opponentSpawnMonster', { monsterLevel, monsterID, monsterHp, monsterPower, monsterNumber });
};

export const monsterAttackBase = (userId, payload, socket, io) => {
  const opponent = findOpponent(socket);
  let isWin = true;

  const { monsterID } = payload;

  let baseHp = getBaseHp(userId);

  const monsterInfo = getSpawnMonster(userId)[monsterID];
  if (!monsterInfo) {
    throw new Error('몬스터 정보를 찾을 수 없습니다.');
  }
  baseHp -= monsterInfo.power;

  setBaseHp(userId, baseHp);
  removeMonster(userId, monsterID);

  if (baseHp <= 0) {
    isWin = false;

    socket.emit('gameOver', { isWin });
    io.to(opponent).emit('gameOver', { isWin: true });
  }

  socket.emit('updateGameState', { baseHp });
};

export const killMonster = (userId, payload, socket) => {
  const { monsterID } = payload;
  const monsterInfo = getSpawnMonster(userId)[monsterID];
  if (!monsterInfo) {
    throw new Error('몬스터 정보를 찾을 수 없습니다.');
  }

  const userGameState = getUserById(userId);
  userGameState.score += 100;

  if (userGameState.score % 2000 === 0) {
    userGameState.userGold += 1000;
    userGameState.stage += 1;

    setLevel(userId, userGameState.stage);
  }

  socket.emit('updateGameState', {
    score: userGameState.score,
    userGold: userGameState.userGold,
    monsterLevel: userGameState.stage,
  });
};

// export const damageMonster = (userId, payload) => {
//   const { towerId, attackPower } = payload;

//   const towers = getTower(userId);
//   const tower = towers.find((tower) => tower.id === towerId);
//   if (!tower) {
//     return { status: 'fail', message: '존재하지 않는 타워입니다.' };
//   }
//   if (attackPower !== 40) {
//     return { status: 'fail', message: '타워의 공격력이 잘못되었습니다.' };
//   }
//   return { status: 'success', message: '몬스터를 공격했습니다.' };
// };
