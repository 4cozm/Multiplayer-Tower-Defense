import CustomError from '../util/error/customError.js';
import { handleError } from '../util/error/errorHandler.js';
import { ErrorCodes } from '../util/error/errorCodes.js';

/**
 * 현재 경기중인 상대방의 socketID를 반환하는 함수
 * @param {socket} socket
 */
export const findOpponent = (socket) => {
  const rooms = socket.nsp.adapter.rooms; // 방 정보를 가져옴
  try {
    for (const [roomId, sockets] of rooms) {
      if (sockets.has(socket.id)) {
        // 현재 소켓이 방에 있는지 확인
        for (const id of sockets) {
          // 방의 모든 소켓 ID를 순회
          if (id !== socket.id) {
            // 자신이 아닌 경우
            return id; // 상대의 socket.id 반환
          }
        }
      }
    }
    return null; // 상대가 없을 경우 null 반환
  } catch (error) {
    handleError(
      socket,
      new CustomError(ErrorCodes.FIND_OPPONENT_FAILED, '상대방을 찾는데 실패했습니다. 전달 받은 정보:', socket),
    );
  }
};

export const findOpponentUserId = (socket) => {
  try {
    const matchedPlayers = getMatchedPlayers();
    const playerMatchData = matchedPlayers.find((player) => player.userId == socket.data.userId);
    if (!playerMatchData) {
      console.error('해당 유저의 매치 상대방을 찾을 수 없습니다');
    }
    return playerMatchData.opponentUserId;
  } catch (error) {
    handleError(
      socket,
      new CustomError(ErrorCodes.FIND_OPPONENT_ID_FAILED, '적 아이디를 찾아오는 과정에서 문제가 발생했습니다.'),
    );
  }
};
