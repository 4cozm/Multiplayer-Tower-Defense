import { game } from '../multi_game.js';
import initializeGameState from './init/init.handler.js';
import updateGameState from './user/updateGameState.handler.js';

const addGame = (handler) => {
  return (...args) => {
    return handler(...args, game);
  };
};

const eventHandler = {
  initializeGameState: addGame(initializeGameState),
  updateGameState: addGame(updateGameState),
};

export default eventHandler;
