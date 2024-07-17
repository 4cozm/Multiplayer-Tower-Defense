import { getGameAssets } from '../init/assets.js';
import { addMonster, getMonsterById, removeMonster } from '../models/monster.model.js';
import { getUserById } from '../models/user.model.js';
import { v4 as uuidv4 } from 'uuid';
import { findOpponent } from '../util/find.opponent.js';
import CustomError from '../util/error/customError.js';
import { handleError } from '../util/error/errorHandler.js';
import { ErrorCodes } from '../util/error/errorCodes.js';
import { setLog } from '../db/log/log.db.js';

export const spawnMonster = (userId, _, socket, io) => {
  try {
    const opponent = findOpponent(socket);
    const { levelsData } = getGameAssets();

    const user = getUserById(userId);
    const userLevel = user.monsterLevel;

    const levelData = levelsData.data.find((data) => data.level === userLevel);

    if (!levelData) {
      throw new CustomError(ErrorCodes.LEVEL_NOT_FOUND, '해당 레벨을 찾을 수 없습니다.');
    }
    const { level: monsterLevel, hp: monsterHp, power: monsterPower } = levelData;
    const monsterID = uuidv4();
    const monsterNumber = Math.floor(Math.random() * 5);

    addMonster(userId, monsterID, monsterHp, monsterPower);

    socket.emit('spawnMonster', { monsterLevel, monsterID, monsterHp, monsterPower, monsterNumber });
    io.to(opponent).emit('opponentSpawnMonster', { monsterLevel, monsterID, monsterHp, monsterPower, monsterNumber });
  } catch (error) {
    setLog(userId, error.message);
    handleError(socket, error);
  }
};

export const monsterAttackBase = (userId, payload, socket, io) => {
  try {
    const opponent = findOpponent(socket);

    const { monsterID } = payload;

    const user = getUserById(userId);

    const monsterInfo = getMonsterById(userId, monsterID);
    if (!monsterInfo) {
      throw new CustomError(ErrorCodes.MONSTER_NOT_FOUND, '몬스터 정보를 찾을 수 없습니다.');
    }
    user.baseHp -= monsterInfo.power;

    removeMonster(userId, monsterID);

  //상대방 화면에서도 몬스터가 죽었다고 보내줘야함
  io.to(opponent).emit('opponentMonsterDead', { monsterId: monsterID });
  socket.emit('updateGameState', { baseHp: user.baseHp }); //기지 체력이 0이 된 정보를 받고 게임오버나 승리 메세지를 받아야 할 것 같습니다.

    if (user.baseHp <= 0) {
      socket.emit('gameOver', { isWin: false });
      io.to(opponent).emit('gameOver', { isWin: true });
    }
  } catch (error) {
    setLog(userId, error.message);
    handleError(socket, error);
  }
};

export const killMonster = (userId, socket) => {
  const user = getUserById(userId); //유저 객체를 가져옴
  user.score += 100;

  if (user.score % 1000 === 0) {
    // 테스트용
    user.userGold += 1000;
    user.monsterLevel += 1;
  }

  socket.emit('updateGameState', {
    score: user.score,
    userGold: user.userGold,
    monsterLevel: user.monsterLevel,
  });
};
