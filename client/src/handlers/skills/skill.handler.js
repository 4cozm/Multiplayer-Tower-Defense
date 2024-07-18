import { Monster } from '../../class/monster.js';
import { sendEvent } from '../../multi_game.js';
import { openModal } from '../../multi_game.js';
const skillAudio = new Audio('sounds/작아진%20저와%20함께%20스킬.mp3');
skillAudio.volume = 1;

export const skill = (game) => {
  if (game.userGold < 200) {
    openModal('골드가 부족합니다');
    return;
  }
  skillAudio.play();
  sendEvent(200);
};

export const skillHeat = (data, game) => {
  //상대방의 스킬이 발동되었을때,
  skillAudio.play();
  const { monsterLevel, monsterID, monsterHp, monsterPower, monsterNumber, monsterPath, randomDelay } = data;
  setTimeout(() => {
    //몬스터 소환에 랜덤 딜레이
    const newMonster = new Monster(monsterLevel, monsterID, monsterHp, monsterPower, monsterNumber, monsterPath);
    game.monsters.push(newMonster);
  }, randomDelay);
};
