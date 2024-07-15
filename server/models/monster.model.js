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

export const getMonsterById = (userId, uuid) => {
  // 조회
  return monsters[userId][uuid];
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
