import { Monster, OpponentMonster } from '../../class/monster.js';
import { game } from '../../multi_game.js';

export const spawnMonster = (data) => {
  const { monsterLevel, monsterID, monsterHp, monsterPower, monsterNumber } = data;
  const newMonster = new Monster(monsterLevel, monsterID, monsterHp, monsterPower, monsterNumber);
  game.monsters.push(newMonster); //몬스터를 그리기
};

export const opponentSpawnMonster = (data) => {
  const { monsterLevel, monsterID, monsterHp, monsterPower, monsterNumber, monsterPath, randomDelay } = data;
  if (randomDelay) {
    //서버에서 랜덤 시간으로 몬스터 생성 요청시 값을 읽어 랜덤으로 스폰
    setTimeout(() => {
      const newMonster = new Monster(monsterLevel, monsterID, monsterHp, monsterPower, monsterNumber, monsterPath);
      game.opponentMonsters.push(newMonster);
    }, randomDelay);
    return;
  }
  const newMonster = new OpponentMonster(monsterLevel, monsterID, monsterHp, monsterPower, monsterNumber, monsterPath);
  game.opponentMonsters.push(newMonster); //몬스터를 그리기
};
