const updateGameState = (syncData, game) => {
  game.userGold = syncData.userGold !== undefined ? syncData.userGold : userGold;
  game.baseHp = syncData.baseHp !== undefined ? syncData.baseHp : baseHp;
  game.score = syncData.score !== undefined ? syncData.score : score;
  game.monsterLevel = syncData.monsterLevel !== undefined ? syncData.monsterLevel : monsterLevel;
  game.monsterID = syncData.monsterID !== undefined ? syncData.monsterID : monsterID;
  game.monsterSpawnInterval =
    game.syncData.monsterSpawnInterval !== undefined ? syncData.monsterSpawnInterval : monsterSpawnInterval;
  game.monsterHp = syncData.monsterHp !== undefined ? syncData.monsterHp : monsterHp;
  game.monsterPower = syncData.monsterPower !== undefined ? syncData.monsterPower : monsterPower;
};

export default updateGameState;
