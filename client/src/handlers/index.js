import { game } from '../multi_game.js';
import initializeGameState from './init/init.handler.js';
import updateGameState from './user/updateGameState.handler.js';
import { makeTower, makeOpponentTower } from './tower/createTower.handler.js';
import { spawnMonster, opponentSpawnMonster } from './monster/monsterSpawn.handler.js';
import { monsterDead, opponentMonsterDead } from './monster/monsterDead.handler.js';
import { opponentTowerAttack, towerAttack } from './tower/towerAttack.handler.js';

const addGame = (handler) => {
  return (...args) => {
    return handler(...args, game);
  };
};

const eventHandler = {
  initializeGameState: addGame(initializeGameState),
  updateGameState: addGame(updateGameState),
  makeTower: addGame(makeTower),
  makeOpponentTower: addGame(makeOpponentTower),
  spawnMonster,
  opponentSpawnMonster,
  monsterDead: addGame(monsterDead),
  opponentMonsterDead: addGame(opponentMonsterDead),
  towerAttack: addGame(towerAttack),
  opponentTowerAttack: addGame(opponentTowerAttack),
};

export default eventHandler;
