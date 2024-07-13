const matchModel = [];

export const addMatch = (uuid) => {
  const player = { uuid };

  matchModel.push(player);
};

export const getMatchPlayers = () => {
  // 조회
  return matchModel;
};

export const clearMatchPlayers = () => {
  // 두 명씩 매칭이 되면 매칭된 사용자들 제거
  matchModel.splice(0, 2);
};
