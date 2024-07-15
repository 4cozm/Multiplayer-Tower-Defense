import { matchGame } from './match.handler.js';
import initialData from './init.handler.js';
import { spawnMonster } from './monster.handler.js';
import { buyTower, attackTower } from './tower.handler.js';

const handlerMappings = {
  1: matchGame, //현재는 안쓰는중
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
  //   20: gameEnd,
  40: spawnMonster,
};

export default handlerMappings;
