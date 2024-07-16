import findOpponent from '../util/find.opponent.js';
import { addChat } from '../models/chat.model.js';
import findRoom from '../util/find.room.js';

export const emoji = (_, payload, socket, io) => {
  const { image } = payload;
  const opponent = findOpponent(socket);
  io.to(opponent).emit('opponentEmoji', image);
};

export const requestChat = (userId, payload, socket, io) => {
  const room = findRoom(socket);

  console.log('message: !!!!!!!!!!!', payload);

  addChat(userId, payload);

  io.to(room).emit('chat', { userId: userId, message: payload });
};
