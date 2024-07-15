import { Tower } from '../../class/tower.js';
import { game } from '../../multi_game.js';
import { ctx } from '../../multi_game.js';
import { towerImage } from '../../multi_game.js';

export const makeTower = (data, game) => {
  const { x, y, uuid } = data;
  const tower = new Tower(x, y, uuid, false);
  game.towers.push(tower);
  tower.draw(ctx, towerImage);

  //모달 알림 : 타워 구매에 성공했습니다.
};

export const makeOpponentTower = (data, game) => {
  const { x, y, uuid } = data;
  const tower = new Tower(x, y, uuid, true);
  console.log('상대방 타워 생성됨,', tower);
  game.opponentTowers.push(tower);
  tower.draw(ctx, towerImage);
};
