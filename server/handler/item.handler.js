import { getGameAssets } from '../init/assets.js';
import { removeAllMonster } from '../models/monster.model.js';
import { getUserById } from '../models/user.model.js';
import findOpponent from '../util/find.opponent.js';

export const buyItem = (userId, payload, socket, io) => {
  const { itemId } = payload;
  const opponent = findOpponent(socket);
  const { itemData } = getGameAssets();

  const serverTime = Date.now(); // 현재 타임스탬프

  const nowItem = itemData.data.find((data) => data.id === itemId);
  if (!nowItem) {
    throw new Error('해당 아이템을 찾을 수 없습니다.');
  }

  const { id, cost } = nowItem;

  console.log(id);
  const userGameState = getUserById(userId);

  if (userGameState.userGold < cost) {
    socket.emit('error', '돈이 부족합니다');
    return { status: 'failed', message: '아이템 구매 실패' };
  }

  userGameState.userGold -= cost;

  socket.emit('updateGameState', {
    userGold: userGameState.userGold,
  });
  // 업데이트된 게임 상태를 클라이언트에 전송
  switch (id) {
    case 1:
      break;
    case 2:
      break;
    case 3:
      if (userGameState.baseHp + 20 <= 200) {
        userGameState.baseHp += 20;
      } else {
        userGameState.baseHp = 200;
      }
      socket.emit('ItemBaseHp', { heal: 20 });
      break;
    case 4:
      removeAllMonster(userId);
      socket.emit('removeItemMonster');
      io.to(opponent).emit('removeItemOpponentMonster');
      break;
    default:
      throw new Error('해당 아이템을 찾을 수 없습니다.');
      break;
  }

  return { status: 'success', message: '아이템 구매 완료' };
};

export const deleteTower = (userId, payload, socket, io) => {};
