import { findOpponent } from '../util/find.opponent.js';
import { addChat } from '../models/chat.model.js';
import findRoom from '../util/find.room.js';
import { setLog } from '../db/log/log.db.js';
import { handleError } from '../util/error/errorHandler.js';

export const emoji = (_, payload, socket, io) => {
  try {
    const { image } = payload;
    const opponent = findOpponent(socket);
    io.to(opponent).emit('opponentEmoji', image);
  } catch (error) {
    setLog(userId, error.message);
    handleError(socket, error);
  }
};

export const requestChat = (userId, payload, socket, io) => {
  try {
    const room = findRoom(socket);
    const addedChat = addChat(userId, payload);

    io.to(room).emit('chat', { userId: userId, message: addedChat });
  } catch (error) {
    setLog(userId, error.message);
    handleError(socket, error);
  }
};
