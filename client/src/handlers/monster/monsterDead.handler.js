export const monsterDead = (data, game) => {
  //몬스터 사망시 처리 로직
  const { monsterId } = data;
  const monsterIndex = game.monsters.findIndex((item) => item.monsterID == monsterId);
  if (monsterIndex.length <= 0) {
    openModal('처리할 몬스터를 찾지 못했습니다:', monsterId);
    return;
  }

  game.monsters.splice(monsterIndex, 1);
};

export const opponentMonsterDead = (data, game) => {
  //적 몬스터 사망시 로직
  const { monsterId, timeStamp } = data;
  // console.log('핑:', Date.now() - timeStamp);
  const monsterIndex = game.opponentMonsters.findIndex((item) => item.monsterID == monsterId);
  if (game.opponentDeleteQueue.length > 0) {
    flushDeleteQueue(game);
  }
  if (monsterIndex.length <= 0) {
    openModal('처리할 상대방 몬스터를 찾지 못했습니다:', monsterId);
    game.opponentDeleteQueue.push(monsterId); //제거 루프를 시행하는 배열에 삽입
    return;
  }
  game.opponentMonsters.splice(monsterIndex, 1);
};

export const itemMonsterDead = (data, game) => {
  const monsterLength = game.monsters.length;

  game.monsters.splice(0, monsterLength);
};

export const opponentItemMonsterDead = (data, game) => {
  const monsterLength = game.opponentMonsters.length;

  game.opponentMonsters.splice(0, monsterLength);
};

const flushDeleteQueue = (game) => {
  const monster = game.opponentDeleteQueue[0]; //제거되지 않은 배열의 첫번째 요소를 가지고 옴
  if (monster) {
    const monsterIndex = game.opponentMonsters.findIndex((item) => item.monsterID == monster);
    if (monsterIndex !== -1) {
      game.opponentMonsters.splice(monsterIndex, 1);
      const deleteQueueMonsterIndex = game.opponentDeleteQueue.findIndex((item) => item.monsterID == monster);
      game.opponentDeleteQueue.splice(deleteQueueMonsterIndex, 1);
      console.log('제거되지 않은 몬스터 보정 작업 완료');
    } else {
      openModal('opponentDeleteQueue에서도 몬스터를 제거하지 못했습니다!', monster);
    }
  }
};
