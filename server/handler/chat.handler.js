import findOpponent from '../util/find.opponent.js';

export const emoji = (_, payload, socket, io) => {
  const { image } = payload;
  const opponent = findOpponent(socket);
  io.to(opponent).emit('opponentEmoji', image);
};

import { addChat } from '../models/chat.model.js';
import findRoom from '../util/find.room.js';

export const requestChat = (userId, payload, socket, io) => {
  const room = findRoom(socket);

  const { message } = payload;

  addChat(userId, message);

  socket.to(room).emit('chat', message);
};
