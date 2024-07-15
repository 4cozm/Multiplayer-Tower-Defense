import { getGameAssets } from '../init/assets.js';
import findOpponent from '../util/find.opponent.js';

export const initialData = (userId, payload, socket, io) => {
  const opponent = findOpponent(socket);

  function generateRandomMonsterPath() {
    const path = [];
    let currentX = 0;
    let currentY = Math.floor(Math.random() * 21) + 500; // 500 ~ 520 범위의 y 시작 (캔버스 y축 중간쯤에서 시작할 수 있도록 유도)

    path.push({ x: currentX, y: currentY });

    while (currentX < 1500 - 120) {
      currentX += Math.floor(Math.random() * 100) + 50; // 50 ~ 150 범위의 x 증가
      // x 좌표에 대한 clamp 처리
      if (currentX > 1500 - 110) {
        currentX = 1500 - 110;
      }

      currentY += Math.floor(Math.random() * 200) - 100; // -100 ~ 100 범위의 y 변경
      // y 좌표에 대한 clamp 처리
      if (currentY < 220) {
        currentY = 220;
      }
      if (currentY > 680 - 80) {
        currentY = 680 - 80;
      }

      path.push({ x: currentX, y: currentY });
    }

    return path;
  }

  const monsterPath = generateRandomMonsterPath();
  const opponentMonsterPath = generateRandomMonsterPath();

  const basePosition = { x: monsterPath[monsterPath.length - 1].x + 80, y: monsterPath[monsterPath.length - 1].y };
  const opponentBasePosition = {
    x: opponentMonsterPath[opponentMonsterPath.length - 1].x + 80,
    y: opponentMonsterPath[opponentMonsterPath.length - 1].y,
  };

  const { init } = getGameAssets();

  const initialGameData = {
    monsterPath,
    opponentMonsterPath,
    basePosition,
    opponentBasePosition,
    userGold: init.data.userGold,
    baseHp: init.data.baseHp,
    towerCost: init.data.towerCost,
    monsterLevel: init.data.monsterLevel,
    monsterSpawnInterval: init.data.monsterSpawnInterval,
    score: init.data.score,
    highScore: init.data.highScore,
  };

  socket.emit('initializeGameState', initialGameData);

  io.to(opponent).emit('initializeGameState', {
    monsterPath: opponentMonsterPath,
    opponentMonsterPath: monsterPath,
    basePosition: opponentBasePosition,
    opponentBasePosition: basePosition,
    userGold: init.data.userGold,
    baseHp: init.data.baseHp,
    towerCost: init.data.towerCost,
    monsterLevel: init.data.monsterLevel,
    monsterSpawnInterval: init.data.monsterSpawnInterval,
    score: init.data.score,
    highScore: init.data.highScore,
  });
};

export default initialData;
