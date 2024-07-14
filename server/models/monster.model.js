// const monsters = {};
// const diedMonster = {};

// export const createMonster = (uuid) => {
//   // 생성
//   monsters[uuid] = [];
//   diedMonster[uuid] = [];
// };

// export const getMonster = (uuid) => {
//   // 조회
//   return monsters[uuid];
// };

// export const setMonster = (uuid, level, attackPower) => {
//   // 삽입
//   return monsters[uuid].push({ level, attackPower });
// };

export const getLevel = (uuid) => {
  // 조회
  return monsters[uuid];
};

export const setLevel = (uuid, level) => {
  // 삽입
  if (!monsters[uuid]) {
    monsters[uuid] = [];
  }
  monsters[uuid].push({ level });
};

export const getSpawnMonster = (uuid) => {
  // 조회
  return monsters[uuid];
};

export const setSpawnMonster = (uuid, newMonsterID, level, monsterSpawnInterval, hp, power) => {
  // 삽입
  return monsters[uuid].push({ newMonsterID, level, monsterSpawnInterval, hp, power });
};

// export const getDieMonster = (uuid) => {
//   return diedMonster[uuid];
// };

// export const setDieMonster = (uuid, monster) => {
//   return diedMonster[uuid].push({ monster });
// };

// export const clearMonster = (uuid) => {
//   monsters[uuid] = [];
//   diedMonster[uuid] = [];
// };
