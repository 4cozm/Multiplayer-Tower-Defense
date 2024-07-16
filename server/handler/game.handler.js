import { getUserById } from '../models/user.model.js';
import { getHighScoreByUserId, updateUserScore } from '../db/user/user.db.js';
import { getSpawnMonster } from '../models/monster.model.js';

export const endGame = async (userId) => {
  const user = getUserById(userId);
  const highScore = await getHighScoreByUserId(userId);

  const currentTime = Date.now();
  const monsters = getSpawnMonster(userId);

  monsters.forEach((monster) => {
    if (currentTime - monster.timestamp > 13000) {
      console.error('검증 실패');
      return;
    }
  });

  if (user.score > highScore) {
    updateUserScore(user.score, userId);
  }
};
