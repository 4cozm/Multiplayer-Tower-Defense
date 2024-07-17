import { addMatch, getMatchPlayers, clearMatchPlayers } from '../models/match.model.js';
import { v4 as uuid } from 'uuid';
import { addMatchedPlayers } from '../models/match.model.js';
import { logError } from '../models/log.model.js';
import { handleError } from '../util/error/errorHandler.js';

export const matchGame = async (userId, socket, io) => {
  try {
    const matchArray = getMatchPlayers();
    const userExists = matchArray.some((item) => item.userId === userId);
    if (userExists) {
      io.to(socket.id).emit('error', '이미 대기열에 포함되어 있습니다.다른 아이디로 다시 접속해 주세요');
      socket.disconnect(); // 중복 접속 시 서버측도 소켓 연결 해제
      return;
    }
    addMatch(userId, socket.id);
    console.log('대기열:', matchArray);

    if (matchArray.length >= 2) {
      const roomName = uuid(); // 방 번호의 규칙을 알 수 없도록

      const player1 = matchArray[0];
      const player2 = matchArray[1];

      addMatchedPlayers(player1, player2);

      io.sockets.sockets.get(player1.socketId).join(roomName);
      io.sockets.sockets.get(player2.socketId).join(roomName);

      console.log(roomName);

      // 클라이언트에 매치가 성사되었음을 알림
      io.to(player1.socketId).emit('matchFound', {
        userId: player1.userId,
      });
      io.to(player2.socketId).emit('matchFound', {
        userId: player2.userId,
      });
      clearMatchPlayers();
    }
  } catch (error) {
    logError(userId, error.message);
    handleError(socket, error);
  }
};
