import { game } from '../multi_game.js';
import initializeGameState from './init/init.handler.js';
import updateGameState from './user/updateGameState.handler.js';
import { makeTower, makeOpponentTower } from './tower/createTower.handler.js';
import { spawnMonster, opponentSpawnMonster } from './monster/monsterSpawn.handler.js';
import {
  itemMonsterDead,
  monsterDead,
  opponentItemMonsterDead,
  opponentMonsterDead,
} from './monster/monsterDead.handler.js';
import { opponentTowerAttack, towerAttack } from './tower/towerAttack.handler.js';
import { moveEmoji, opponentEmoji, opponentMoveEmoji } from './chat/emoji.handler.js';
import { makeChat } from './chat/chat.handler.js';
import { skill, skillHeat } from './skills/skill.handler.js';
import { itemHeal } from './item/heal.handler.js';
import { itemTowerDestroy, opponentItemTowerDestroy } from './item/itemTower.handler.js';
import { itemMonsterSpeedUp, opponentItemMonsterSpeedUp } from './item/itemMonster.handler.js';

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
  opponentEmoji,
  opponentMoveEmoji,
  moveEmoji,
  makeChat: addGame(makeChat),
  skill: addGame(skill),
  skillHeat: addGame(skillHeat),
  itemMonsterDead: addGame(itemMonsterDead),
  opponentItemMonsterDead: addGame(opponentItemMonsterDead),
  itemHeal: addGame(itemHeal),
  itemTowerDestroy: addGame(itemTowerDestroy),
  opponentItemTowerDestroy: addGame(opponentItemTowerDestroy),
};

export default eventHandler;
