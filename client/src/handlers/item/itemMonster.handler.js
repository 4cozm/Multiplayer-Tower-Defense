export const itemMonsterSpeedUp = (data, game) => {
  const monsterLength = game.opponentMonsters.length;

  for (let i = 0; i < monsterLength; i++) {
    console.log(game.opponentMonsters[i].speed);
    game.opponentMonsters[i].speed += 15;
    console.log(game.opponentMonsters[i].speed);
  }
};

export const opponentItemMonsterSpeedUp = (data, game) => {
  const monsterLength = game.monsters.length;
  for (let i = 0; i < monsterLength; i++) {
    console.log(game.monsters[i].speed);
    game.monsters[i].speed += 15;
    console.log(game.monsters[i].speed);
  }
};
