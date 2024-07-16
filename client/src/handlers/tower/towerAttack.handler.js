export const towerAttack = (data, game) => {
  //타워 공격시 처리 로직
  const { monsterId, hp } = data;
  if (!(monsterId && hp)) {
    console.error(`서버측에서 보낸 데이터가 오류가 있습니다 monsterId:${monsterId} ,hp:${hp}`);
  }
  const monster = game.monsters.find((item) => {
    return item.monsterID == monsterId;
  });
  if (!monster) {
    console.error('몬스터를 찾지 못했습니다', monsterId);
    return;
  }

  monster.hp = hp;
};

export const opponentTowerAttack = (data, game) => {
  //적 타워 공격시 처리 로직 - 공격 이펙트
  const { monsterId, towerId } = data;
  const tower = game.opponentTowers.find((item) => {
    return item.uuid == towerId;
  });
  if (!tower) {
    console.error('적 타워 공격 처리를 실행할 수 없습니다 타워 정보 없음:', tower);
  }
  const monster = game.opponentMonsters.find((item) => {
    return (item.monsterID == monsterId);
  });
  if (!monster) {
    console.error('적 타워 공격 처리를 실행할 수 없습니다 몬스터 정보 없음:', monster);
  }
  //레이저 빔 그림 그려줌
  tower.attack(monster);
};
