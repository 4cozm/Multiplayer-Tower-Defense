const monsters = {};

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

export const setLevel = (userId, level) => {
  if (!monsters[userId]) {
    monsters[userId] = [];
  }
  monsters[userId].level = level;
};

export const getLevel = (userId) => {
  if (!monsters[userId] || !monsters[userId].level) {
    return 1;
  }
  return monsters[userId].level;
};

export const setBaseHp = (userId, baseHp) => {
  if (!monsters[userId]) {
    monsters[userId] = {};
  }
  if (!monsters[userId].baseHp) {
    monsters[userId].baseHp = 200;
  }
  monsters[userId].baseHp = baseHp;
};

export const getBaseHp = (userId) => {
  if (!monsters[userId] || !monsters[userId].baseHp) {
    return 200;
  }
  return monsters[userId].baseHp;
};
