export const itemTowerDestroy = (data, game) => {
  const { towerId } = data;
  const towerIndex = game.opponentTowers.findIndex((item) => item.uuid == towerId);

  game.opponentTowers.splice(towerIndex, 1);
};

export const opponentItemTowerDestroy = (data, game) => {
  const { towerId } = data;
  const towerIndex = game.towers.findIndex((item) => item.uuid == towerId);

  game.towers.splice(towerIndex, 1);
};
