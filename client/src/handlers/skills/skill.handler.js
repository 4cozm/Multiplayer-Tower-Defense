//스킬 관련 로직

import { Monster } from '../../class/monster.js';
import { sendEvent } from '../../multi_game.js';
const skillAudio = new Audio('sounds/작아진%20저와%20함께%20스킬.mp3');
skillAudio.volume = 1;
//현재는 하나의 스킬만 구현하기에 스킬 추가시 구조 변경이 필요합니다
export const skill = (game) => {
  if (game.userGold < 200) {
    //모달 오류 삽입해야함
    return;
  }
  skillAudio.play();
  sendEvent(200); //스킬 구현 요청
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
