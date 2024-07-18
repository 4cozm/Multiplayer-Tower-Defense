const monsters = {};
const verifyMonsters = {};

export const addMonster = (userId, uuid, hp, power) => {
  if (!monsters[userId]) {
    monsters[userId] = [];
  }
  monsters[userId][uuid] = { hp, power, timestamp: Date.now() };
};

export const getSpawnMonster = (userId) => {
  return monsters[userId];
};

export const removeMonster = (userId, uuid) => {
  delete monsters[userId][uuid];
};

export const removeAllMonster = (userId) => {
  delete monsters[userId];
};

export const getMonsterById = (userId, monsterID) => {
  return monsters[userId][monsterID];
};
