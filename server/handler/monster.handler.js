import { getGameAssets } from '../init/assets.js';
// import { getTower } from '../models/tower.model.js';
// import { getUserById } from '../models/user.model.js';
import { setLevel, getLevel, setSpawnMonster } from '../models/monster.model.js';
import { v4 as uuidv4 } from 'uuid';
import findOpponent from '../util/find.opponent.js';

export const spawnMonster = (userId, payload, socket, io) => {
  console.log('spawnMonster');
  const opponent = findOpponent(socket);

  const { levelsData } = getGameAssets();
  const { monsterLevel } = payload;

  setLevel(token, level);

  let currentLevels = getLevel(userId);
  currentLevels.sort((a, b) => a.level - b.level);
  const currentLevel = currentLevels[currentLevels.length - 1].level;
  const levelData = levelsData.data.find((level) => level.id === currentLevel);

  let monsterSpawnInterval, hp, power;
  if (levelData) {
    ({ monsterSpawnInterval, hp, power } = levelData);
  } else {
    throw new Error('해당 레벨을 찾을 수 없습니다.');
  }

  const newMonsterID = uuidv4();

  setSpawnMonster(token, newMonsterID, level, monsterSpawnInterval, hp, power);

  socket.emit('updateGameState', {
    monsterID: newMonsterID,
    monsterSpawnInterval,
    monsterHp: hp,
    monsterPower: power,
  });
  io.to(opponent).emit('updateGameState', {
    monsterSpawnInterval,
    monsterHp: hp,
    monsterPower: power,
  });
  console.log('spawnMonster end');
};

// export const removeMonster = (userId, payload, socket) => {
//   if (payload.hp > 0) {
//     return { status: 'fail', message: '비정상적인 제거입니다.' };
//   }
//   setDieMonster(userId, payload.monster);

//   // 현재 score에 +100을 추가
//   const userGameState = getUserById(userId);
//   userGameState.score += 100;

//   if (payload.monster.isGolden) {
//     userGameState.userGold += 500;
//   }

//   if (userGameState.score % 2000 === 0) {
//     userGameState.userGold += 1000;
//     userGameState.monsterLevel += 1;
//   }
//   // 업데이트된 게임 상태를 클라이언트에 전송
//   socket.emit('updateGameState', {
//     score: userGameState.score,
//     userGold: userGameState.userGold,
//     monsterLevel: userGameState.monsterLevel,
//   });

//   return { status: 'success', message: '몬스터를 >>제거<<했습니다.' };
// };

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

// export const monsterAttackBase = (userId, payload, socket) => {
//   const { levelsData } = getGameAssets();

//   const { level, attackPower } = payload;

//   setMonster(userId, level, attackPower);

//   let currentLevels = getMonster(userId);
//   currentLevels.sort((a, b) => a.level - b.level);
//   const currentLevel = currentLevels[currentLevels.length - 1];
//   const powerData = levelsData.data.find((level) => level.power === attackPower);
//   if (!powerData) {
//     return { status: 'fail', message: '존재하지 않는 파워입니다.' };
//   }

//   if (currentLevel.attackPower !== powerData.power) {
//     return { status: 'fail', message: '현재 레벨의 파워가 아닙니다.' };
//   }

//   // 기지의 HP를 감소
//   const userGameState = getUserById(userId);
//   userGameState.baseHp -= attackPower;
//   if (userGameState.baseHp < 0) userGameState.baseHp = 0; // 기지 HP가 음수가 되지 않도록 조정

//   socket.emit('updateGameState', {
//     baseHp: userGameState.baseHp,
//   });

//   return { status: 'success', message: '기지가 공격 당했습니다.' };
// };
