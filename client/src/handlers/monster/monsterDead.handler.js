export const monsterDead = (data, game) => {
  //몬스터 사망시 처리 로직
  const { monsterId } = data;
  const monsterIndex = game.monsters.findIndex((item) => item.monsterID == monsterId);
  if (monsterIndex.length <= 0) {
    console.error('처리할 몬스터를 찾지 못했습니다:', monsterId);
    return;
  }

  game.monsters.splice(monsterIndex, 1);
};

export const opponentMonsterDead = (data, game) => {
  //적 몬스터 사망시 로직
  const { monsterId } = data;
  const monsterIndex = game.opponentMonsters.findIndex((item) => item.monsterID == monsterId);
  if (!monsterIndex) {
    console.error('처리할 상대방 몬스터를 찾지 못했습니다:', monsterId);
    return;
  }

  game.opponentMonsters.splice(monsterIndex, 1);

};
