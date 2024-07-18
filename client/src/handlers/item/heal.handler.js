export const itemHeal = (data, game) => {
  const { heal } = data;
  game.base.healItem(heal);
};
