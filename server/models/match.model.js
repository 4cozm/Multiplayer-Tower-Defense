const matchModel = [];

export const addMatch = (uuid) => {
  const player = { uuid };

  matchModel.push(player);
};

export const getMatch = (uuid) => {
  // 조회
  return matchModel[uuid];
};
