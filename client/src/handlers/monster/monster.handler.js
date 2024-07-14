import { Monster, OpponentMonster } from '../../class/monster.js';
import { game } from '../../multi_game.js';

export const spawnMonster = (data) => {
  const { monsterLevel, monsterID, monsterHp, monsterPower } = data;
  const newMonster = new Monster(monsterLevel, monsterID, monsterHp, monsterPower);
  game.monsters.push(newMonster); //몬스터를 그리기
};

export const opponentSpawnMonster = (data) => {
  const { monsterLevel, monsterID, monsterHp, monsterPower } = data;
  const newMonster = new OpponentMonster(monsterLevel, monsterID, monsterHp, monsterPower);
  game.opponentMonsters.push(newMonster); //몬스터를 그리기
};
