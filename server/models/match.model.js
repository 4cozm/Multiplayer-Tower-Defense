import CustomError from '../util/error/customError.js';
import { ErrorCodes } from '../util/error/errorCodes.js';

const matchModel = [];
/**
 * 유저를 매치 대기열에 push하고 변경된 배열 정보를 반환합니다.
 * @param {string} userId
 * @param {socketId} socketId
 */
export const addMatch = (userId, socketId) => {
  if (!userId || !socketId) {
    throw new CustomError(
      ErrorCodes.ADD_MATCH_QUEUE_FAILED,
      '매치큐에 등록하기 위한 정보가 누락되었습니다',
      userId,
      socketId,
    );
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
    console.error('대기열에서 유저 제거 중 오류 발생', error);
  }
};