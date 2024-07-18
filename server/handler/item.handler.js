import { getGameAssets } from '../init/assets.js';
import { addItems } from '../models/item.model.js';
import { removeAllMonster, getSpawnMonster, removeMonster } from '../models/monster.model.js';
import { getAllTower, removeTower } from '../models/tower.model.js';
import { getUserById } from '../models/user.model.js';
import { findOpponent, findOpponentUserId } from '../util/find.opponent.js';
import CustomError from '../util/error/customError.js';
import { handleError } from '../util/error/errorHandler.js';
import { ErrorCodes } from '../util/error/errorCodes.js';

export const buyItem = (userId, payload, socket, io) => {
  try {
    const { itemId } = payload;
    const { itemData } = getGameAssets();

    const opponent = findOpponent(socket);
    const opponentId = findOpponentUserId(socket);

    const nowItem = itemData.data.find((data) => data.id === itemId);
    if (!nowItem) {
      throw new CustomError(ErrorCodes.NOT_FOUND_ITEM, '해당 아이템을 찾을 수 없습니다.');
    }

    const { id, cost } = nowItem;

    const userGameState = getUserById(userId);

    if (userGameState.userGold < cost) {
      throw new CustomError(ErrorCodes.NOT_ENOUGH_GOLD, '골드가 부족합니다.');
    }

    if (id === 3 && userGameState.baseHp === 200) {
      throw new CustomError(ErrorCodes.ENOUGH_BASE_HP, '이미 최대 체력입니다.');
    }

    const enemyTowers = getAllTower(opponentId);
    if (id === 1 && Object.keys(enemyTowers).length === 0) {
      throw new CustomError(ErrorCodes.TOWER_NOT_FOUND, '상대의 타워가 없습니다.');
    }

    const spawnMonster = getSpawnMonster(userId);
    if (id === 4 && !spawnMonster) {
      throw new CustomError(ErrorCodes.TOWER_NOT_FOUND, '이미 몬스터가 없습니다.');
    }

    userGameState.userGold -= cost;

    socket.emit('updateGameState', {
      userGold: userGameState.userGold,
    });

    switch (id) {
      case 1:
        const randTowerId = Math.floor(Math.random() * Object.keys(enemyTowers).length);
        socket.emit('towerDestroy', {
          towerId: Object.keys(enemyTowers)[randTowerId],
        });
        io.to(opponent).emit('opponentTowerDestroy', {
          towerId: Object.keys(enemyTowers)[randTowerId],
        });
        removeTower(opponentId, Object.keys(enemyTowers)[randTowerId]);
        console.log('타워파괴과정', getAllTower(opponentId));
        addItems(userId, id);
        break;
      case 3:
        if (userGameState.baseHp + 20 <= 200) {
          userGameState.baseHp += 20;
        }
        socket.emit('ItemBaseHp', { heal: 20 });
        addItems(userId, id);
        break;
      case 4:
        removeAllMonster(userId);
        socket.emit('removeItemMonster');
        io.to(opponent).emit('removeItemOpponentMonster');
        addItems(userId, id);
        break;
    }
  } catch (error) {
    handleError(socket, error);
  }
};
