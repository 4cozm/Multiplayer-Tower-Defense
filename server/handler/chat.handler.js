import findOpponent from '../util/find.opponent.js';
import { addChat } from '../models/chat.model.js';
import findRoom from '../util/find.room.js';
import * as chat from '../protobuf/chatProtobuf.js';

export const emoji = (_, payload, socket, io) => {
  const { image } = payload;
  const opponent = findOpponent(socket);
  io.to(opponent).emit('opponentEmoji', image);
};

export const requestChat = (userId, payload, socket, io) => {
  const room = findRoom(socket);

  console.log(payload);

  const chatting = chat.decodeChatMessage(payload);

  console.log(chatting.user);

  addChat(chatting.user, chatting.message);

  const encodedPayload = chat.encodeChatMessage(chatting);
  socket.to(room).emit('chat', { encodedPayload });
};
