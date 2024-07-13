import { initializeGameHandler } from './sync.handler.js';
// import { removeMonster, damageMonster, monsterAttackBase } from './monster.handler.js';
// import { attackTower, buyTower, initTower, refundTower, upgradeTower } from './tower.handler.js';
// import { checkForBreak } from './base.handler.js';
// import { gameEnd } from './game.handler.js';
import { spawnMonster } from './monster.handler.js';
import { matchGame } from './match.handler.js';

const handlerMappings = {
  0: matchGame,
  1: initializeGameHandler,
  // 5: initTower,
  // 6: buyTower,
  // 7: attackTower,
  // 8: refundTower,
  // 9: upgradeTower,
  // 12: removeMonster,
  // 13: damageMonster,
  // 14: monsterAttackBase,
  // 15: checkForBreak,
  // 20: gameEnd,
  40: spawnMonster,
};

export default handlerMappings;
