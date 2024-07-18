export const itemTowerDestroy = (data, game) => {
  const { towerId } = data;
  const towerIndex = game.opponentTowers.findIndex((item) => item.uuid == towerId);

  if (towerIndex.length <= 0) {
    console.error('없앨 타워를 찾지 못했습니다:', towerId);
    return;
  }

  game.opponentTowers.splice(towerIndex, 1);
};

export const opponentItemTowerDestroy = (data, game) => {
  const { towerId } = data;
  const towerIndex = game.towers.findIndex((item) => item.uuid == towerId);

  if (towerIndex.length <= 0) {
    console.error('없앨 타워를 찾지 못했습니다:', towerId);
    return;
  }

  game.towers.splice(towerIndex, 1);
};
