const matchModel = [];

export const addMatch = (uuid) => {
  const player = { uuid };

  matchModel.push(player);
};

export const getMatchPlayers = () => {
  // 조회
  return matchModel;
};
