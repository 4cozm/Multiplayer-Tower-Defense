const initializeGameState = (initialGameData, game) => {
  game.monsterPath = initialGameData.monsterPath;
  game.opponentMonsterPath = initialGameData.opponentMonsterPath;
  game.basePosition = initialGameData.basePosition;
  game.opponentBasePosition = initialGameData.opponentBasePosition;
  game.userGold = initialGameData.userGold;
  game.baseHp = initialGameData.baseHp;
  game.towerCost = initialGameData.towerCost;
  game.monsterLevel = initialGameData.monsterLevel;
  game.monsterSpawnInterval = initialGameData.monsterSpawnInterval;
  game.score = initialGameData.score;
  game.highScore = initialGameData.highScore;
  game.userHighScore = initialGameData.userHighScore;
  game.userRank = initialGameData.userRank;
  game.opponentRank = initialGameData.opponentRank;
};

export default initializeGameState;
