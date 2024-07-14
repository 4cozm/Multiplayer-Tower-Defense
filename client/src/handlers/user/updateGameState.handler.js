const updateGameState = (syncData, game) => {
  game.userGold = syncData.userGold !== undefined ? syncData.userGold : game.userGold;
  game.baseHp = syncData.baseHp !== undefined ? syncData.baseHp : game.baseHp;
  game.score = syncData.score !== undefined ? syncData.score : game.score;
  game.monsterLevel = syncData.monsterLevel !== undefined ? syncData.monsterLevel : game.monsterLevel;
  game.monsterID = syncData.monsterID !== undefined ? syncData.monsterID : game.monsterID;
  game.monsterSpawnInterval =
    syncData.monsterSpawnInterval !== undefined ? syncData.monsterSpawnInterval : game.monsterSpawnInterval;
  game.monsterHp = syncData.monsterHp !== undefined ? syncData.monsterHp : game.monsterHp;
  game.monsterPower = syncData.monsterPower !== undefined ? syncData.monsterPower : game.monsterPower;
};

export default updateGameState;
