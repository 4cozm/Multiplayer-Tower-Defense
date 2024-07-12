import { addMatch, getMatchPlayers } from '../models/match.model.js';

export const matchGame = async (userId, socket) => {
  addMatch(userId);

  const players = getMatchPlayers();

  if (getMatch.length >= 2) {
    socket.emit('matchFound', players);
  }
};
