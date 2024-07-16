import findOpponent from '../util/find.opponent.js';

export const emoji = (_, payload, socket, io) => {
  const { image } = payload;
  const opponent = findOpponent(socket);
  io.to(opponent).emit('opponentEmoji', image);
};
