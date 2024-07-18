import { matchGame } from './match.handler.js';
import initialData from './init.handler.js';
import { emoji, requestChat } from './chat.handler.js';
import { buyTower, attackTower } from './tower.handler.js';
import { monsterAttackBase, spawnMonster } from './monster.handler.js';
import { endGame } from './game.handler.js';
import { skill } from './skill.handler.js';
import { buyItem } from './item.handler.js';

const handlerMappings = {
  10: initialData,
  6: buyTower,
  7: attackTower,
  40: spawnMonster,
  50: monsterAttackBase,
  70: buyItem,
  31: requestChat,
  99: endGame,
  100: emoji,
  200: skill,
};

export default handlerMappings;
