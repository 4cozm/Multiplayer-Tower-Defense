import { matchGame } from './match.handler.js';
import connectionTest from './test.handler.js';

const handlerMappings = {
  1: matchGame,
  //   5: initTower,
  //   6: buyTower, //사용중
  //   7: attackTower,
  //   8: refundTower,
  //   9: upgradeTower,
  //   12: removeMonster,
  //   13: damageMonster,
  //   14: monsterAttackBase,
  //   15: checkForBreak,
  //   20: gameEnd,
  //   40: spawnMonster,
  999: connectionTest,
};

export default handlerMappings;
