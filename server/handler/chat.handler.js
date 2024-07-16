import { addChat } from '../models/chat.model.js';
import findRoom from '../util/find.room.js';

export const requestChat = (userId, payload, socket, io) => {
  const room = findRoom(socket);

  const { message } = payload;

  addChat(userId, message);

  socket.to(room).emit('chat', message);
};
