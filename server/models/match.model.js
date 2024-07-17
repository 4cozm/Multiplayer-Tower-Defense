import CustomError from '../util/error/customError.js';
import { handleError } from '../util/error/errorHandler.js';
import { ErrorCodes } from '../util/error/errorCodes.js';

const matchModel = [];
const matchedPlayers = [];
/**
 * 유저를 매치 대기열에 push하고 변경된 배열 정보를 반환합니다.
 * @param {string} userId
 * @param {socketId} socketId
 */
export const addMatch = (userId, socketId) => {
  if (!userId || !socketId) {
    throw new CustomError(ErrorCodes.ADD_MATCH_QUEUE_FAILED, '매치큐에 등록하기 위한 정보가 누락되었습니다.');
  }
  const player = { userId, socketId };

  matchModel.push(player);
  return matchModel;
};

export const getMatchPlayers = () => {
  // 조회
  return matchModel;
};

export const clearMatchPlayers = () => {
  // 두 명씩 매칭이 되면 매칭된 사용자들 제거
  matchModel.splice(0, 2);
};

export const deletePlayerFromMatchModel = (socket) => {
  // 유저가 대기열 상태에서 게임을 종료할 시 배열에서 삭제
  try {
    const matchModel = getMatchPlayers();
    const index = matchModel.findIndex((item) => {
      return item.socketId === socket.id;
    });

    if (index !== -1) {
      matchModel.splice(index, 1); // matchModel 배열에서 삭제
      console.log(socket.data.userId + ' 유저가 대기열에서 나갔습니다.');
      console.log('대기열 남은 유저 수:', matchModel.length);
    }
  } catch (error) {
    handleError(socket, new CustomError(ErrorCodes.DELETE_PLAYER_FAILED, '대기 중인 유저 제거 중 오류 발생'));
  }
};

export const addMatchedPlayers = (player1, player2) => {
  //구조 분해 할당으로 두 유저의 값에 상대 유저의 ID를 추가해준다
  const { userId: player1Id, socketId: player1SocketId } = player1;
  const { userId: player2Id, socketId: player2SocketId } = player2;

  const newPlayer1 = { userId: player1Id, socketId: player1SocketId, opponentUserId: player2Id };
  const newPlayer2 = { userId: player2Id, socketId: player2SocketId, opponentUserId: player1Id };
  matchedPlayers.push(newPlayer1, newPlayer2);
};

export const getMatchedPlayers = () => {
  return matchedPlayers;
};

export const deleteMatchedPlayer = (socket, io) => {
  try {
    const exit = matchedPlayers.find((exit) => exit.socketId === socket.id);

    const index = matchedPlayers.indexOf(exit);
    matchedPlayers.splice(index, 1);

    if (matchedPlayers.length > 0) {
      io.to(matchedPlayers[0].socketId).emit('gameOver', { OpponentForfeit: true });
    }
  } catch (error) {
    handleError(socket, new CustomError(ErrorCodes.DELETE_MATCHED_PLAYER_FAILED, '매칭된 유저 제거 중 오류 발생'));
  }
};
