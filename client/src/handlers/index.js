import { game } from '../multi_game.js';
import initializeGameState from './init/init.handler.js';
import updateGameState from './user/updateGameState.handler.js';
import { makeTower, makeOpponentTower } from './tower/createTower.handler.js';

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
};

export default eventHandler;
