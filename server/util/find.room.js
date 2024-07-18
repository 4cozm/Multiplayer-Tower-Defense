import CustomError from '../util/error/customError.js';
import { handleError } from '../util/error/errorHandler.js';
import { ErrorCodes } from '../util/error/errorCodes.js';

const findRoom = (socket) => {
  const rooms = socket.nsp.adapter.rooms; // 방 정보를 가져옴
  try {
    for (const [roomId, sockets] of rooms) {
      if (sockets.has(socket.id)) {
        // 현재 소켓이 방에 있는지 확인
        for (const id of sockets) {
          // 방의 모든 소켓 ID를 순회
          if (id !== socket.id) {
            // 자신이 아닌 경우
            return roomId; // 상대의 socket.id 반환
          }
        }
      }
    }
    return null; // 상대가 없을 경우 null 반환
  } catch (error) {
    handleError(
      socket,
      new CustomError(ErrorCodes.FIND_ROOM_FAILED, '방 정보를 찾는데 실패했습니다. 전달 받은 정보:', socket),
    );
  }
};

export default findRoom;
