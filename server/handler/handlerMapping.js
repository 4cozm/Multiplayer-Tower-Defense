import { matchGame } from './match.handler.js';
import initialData from './init.handler.js';
import { emoji, requestChat } from './chat.handler.js';
import { buyTower, attackTower } from './tower.handler.js';
import { monsterAttackBase, spawnMonster } from './monster.handler.js';

import { endGame } from './game.handler.js';

const handlerMappings = {
  //1: matchGame,
  10: initialData,
  //   5: initTower,
  6: buyTower,
  7: attackTower,
  //   8: refundTower,
  //   9: upgradeTower,
  //   12: removeMonster,
  //   13: damageMonster,
  //   14: monsterAttackBase,
  //   15: checkForBreak,
  // 20: endGame,
  40: spawnMonster,
  50: monsterAttackBase,
  31: requestChat,
  99: endGame,
  100: emoji,
};

export default handlerMappings;
