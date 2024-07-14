const monsters = {};
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

export const addMonster = (userId, uuid, hp, power) => {
  //몬스터의 정보를 저장 (새로 추가했어요. 기존 함수 이름들이 헷갈려서)
  //유저 아이디를 기반으로 몬스터를 관리
  if (!monsters[userId]) {
    monsters[userId] = [];
  }
  monsters[userId][uuid] = { hp, power };
};

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
