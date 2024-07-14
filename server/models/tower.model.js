const towerAttacks = {}; //타워의 공격 정보
const towers = {}; //타워의 정보
const refundTowers = {};

export const createTowerSystem = (uuid) => {
  towerAttacks[uuid] = [];
  towers[uuid] = [];
  refundTowers[uuid] = [];
};

export const getTower = (uuid) => {
  return towers[uuid];
};

export const clearTower = (uuid) => {
  towers[uuid] = [];
  towerAttacks[uuid] = [];
  refundTowers[uuid] = [];
};

export const setTower = (userId, x, y, level, uuid, serverTime) => {
  if (!towers[uuid]) {
    towers[uuid] = []; // 빈 배열로 초기화
  }
  return towers[uuid].push({ userId, x, y, level, uuid, serverTime });
};

export const setAttackTower = (uuid, id, timestamp) => {
  return towerAttacks[uuid].push({ id, timestamp });
};

export const setRefundTower = (uuid, id, timestamp) => {
  return refundTowers[uuid].push({ id, timestamp });
};

export const setTowerUpgrade = (uuid, id, Level) => {
  const tower = towers[uuid].find((data) => data.id === id);
  tower.level = Level;
  console.log('tower 정보 : ', tower, 'tower Level : ', tower.level);
};
