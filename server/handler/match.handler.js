import { addMatch } from '../models/match.model.js';

export const gameMatch = async (userId, socket) => {
  addMatch(userId);

  if (getMatch.length >= 2) {
    socket.emit('matchFound');
  }
};
