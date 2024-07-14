import { addMatch, getMatchPlayers, clearMatchPlayers } from '../models/match.model.js';
import initialData from './init.handler.js';

export const matchGame = async (userId, socket, io) => {
  const MatchArray = addMatch(userId, socket.id);
  console.log('대기열:', MatchArray); //테스트 코드
  const players = getMatchPlayers();

  if (MatchArray.length >= 2) {
    const roomName = `room-${Date.now()}`;

    const player1 = players[0];
    const player2 = players[1];

    io.sockets.sockets.get(player1.socketId).join(roomName);
    io.sockets.sockets.get(player2.socketId).join(roomName);

    // 클라이언트에 매치가 성사되었음을 알림
    io.to(player1.socketId).emit('matchFound', {
      userId: player1.userId,
    });
    io.to(player2.socketId).emit('matchFound', {
      userId: player2.userId,
    });

    clearMatchPlayers();
  }
};
