import { getUserById } from '../models/user.model.js';
import { getHighScoreByUserId, updateUserScore } from '../db/user/user.db.js';
import { getSpawnMonster } from '../models/monster.model.js';
import CustomError from '../util/error/customError.js';
import { handleError } from '../util/error/errorHandler.js';
import { ErrorCodes } from '../util/error/errorCodes.js';
import { setLog } from '../db/log/log.db.js';

export const endGame = async (userId, socket) => {
  try {
    const user = getUserById(userId);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, `사용자를 찾을 수 없습니다: ${userId}`);
    }

    const highScore = await getHighScoreByUserId(userId);
    if (highScore === null) {
      throw new CustomError(ErrorCodes.SCORE_NOT_FOUND, `게임 점수를 찾을 수 없습니다: ${userId}`);
    }

    const currentTime = Date.now();
    const monsters = getSpawnMonster(userId);

    Object.values(monsters).forEach((userMonsters) => {
      Object.values(userMonsters).forEach((monster) => {
        if (currentTime - monster.timestamp > 13000) {
          throw new CustomError(ErrorCodes.FAIL_TIMESTAMP_VERIFY, `검증 실패: 타임스탬프가 유효하지 않습니다.`);
        }
      });
    });

    if (user.score > highScore) {
      await updateUserScore(user.score, userId);
    }
  } catch (error) {
    setLog(userId, error.message);
    handleError(socket, error);
  }
};
