const towerAttacks = {}; //타워의 공격 정보
const towers = {}; //타워의 정보
const refundTowers = {};

export const createTowerSystem = (uuid) => {
  towerAttacks[uuid] = [];
  towers[uuid] = [];
  refundTowers[uuid] = [];
};
export const clearTower = (uuid) => {
  towers[uuid] = [];
  towerAttacks[uuid] = [];
  refundTowers[uuid] = [];
};

/**
 *유저 아이디와 타워 UUID로 해당 타워를 조회하는 기능 (x, y, level, uuid, lastAttackTime)이 저장되어 있음
 * @param {유저 아이디} userId
 * @param {타워 uuid} uuid
 * @returns
 */
export const getTower = (userId, uuid) => {
  return towers[userId] ? towers[userId][uuid] : null;
};

export const setTower = (userId, x, y, level, towerId, power, lastAttackTime) => {
  if (!towers[userId]) {
    towers[userId] = {};
  }
  towers[userId][towerId] = { x, y, level, towerId, power, lastAttackTime };
  return towers[userId][towerId];
};

export const setTowerAttackLog = (userId, towerId, monsterId, towerPower, serverTime) => {
  if (!towerAttacks[userId]) {
    towerAttacks[userId] = {};
  }
  towerAttacks[userId][towerId] = { towerId, monsterId, towerPower, serverTime };
  return towerAttacks[userId][towerId];
};

export const setRefundTower = (uuid, id, timestamp) => {
  return refundTowers[uuid].push({ id, timestamp });
};

export const setTowerUpgrade = (uuid, id, Level) => {
  const tower = towers[uuid].find((data) => data.id === id);
  tower.level = Level;
  console.log('tower 정보 : ', tower, 'tower Level : ', tower.level);
};
