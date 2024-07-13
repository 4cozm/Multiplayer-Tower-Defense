const matchModel = [];
/**
 * 유저를 매치 대기열에 push하는 기능
 * @param {string} uuid 
 * @param {socketId} socketId 
 */
export const addMatch = (uuid,socketId) => {
  const player = { uuid,socketId };

  matchModel.push(player);
  /*
    player:{
      uuid:hohoazumma
      socketId:어쩌고 저쩌고
    }
   */
};

export const getMatchPlayers = () => {
  // 조회
  return matchModel;
};

export const clearMatchPlayers = () => {
  // 두 명씩 매칭이 되면 매칭된 사용자들 제거
  matchModel.splice(0, 2);
};
