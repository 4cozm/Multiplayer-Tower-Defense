import { findOpponent, findOpponentUserId } from '../util/find.opponent.js';
import { getUserById } from '../models/user.model.js';
import { addMonster } from '../models/monster.model.js';
import { v4 as uuidv4 } from 'uuid';

export const skill = (userId, _, socket, io) => {
  const opponent = findOpponent(socket);
  const opponentUserId = findOpponentUserId(socket);

  const user = getUserById(userId);
  user.userGold -= 200;

  socket.emit('updateGameState', { userGold: user.userGold });

  //스킬로 생성되는 몬스터의 정보 원래는 JSON에 저장된 데이터를 가져오는게 맞음
  const monsterHp = 11;
  const monsterPower = 1;
  const monsterNumber = 5; //이미지의 번호 - 서버에서는 몬스터 이미지 로딩을 0번부터 진행하기에 몬스터 개수 -1값을 넣어야함
  const monsterLevel = 1; //단순 표시용

  for (let i = 0; i < 10; i++) {
    const randomDelay = Math.floor(Math.random() * (5000 - 0 + 1)) + 0; // 0  ~ 5초 랜덤
    const monsterPath = generateRandomMonsterPath(); //몬스터 마다 별도의 길을 가질 수 있게
    const monsterID = uuidv4();
    addMonster(opponentUserId, monsterID, monsterHp, monsterPower);
    socket.emit('opponentSpawnMonster', {
      monsterLevel,
      monsterID,
      monsterHp,
      monsterPower,
      monsterNumber,
      monsterPath,
      randomDelay,
    });
    io.to(opponent).emit('skillHeat', {
      monsterLevel,
      monsterID,
      monsterHp,
      monsterPower,
      monsterNumber,
      monsterPath,
      randomDelay,
    });
  }
};

function generateRandomMonsterPath() {
  //몬스터 길을 만드는 함수
  const path = [];
  let currentX = 0;
  let currentY = Math.floor(Math.random() * 21) + 500; // 500 ~ 520 범위의 y 시작 (캔버스 y축 중간쯤에서 시작할 수 있도록 유도)

  path.push({ x: currentX, y: currentY });

  while (currentX < 1500 - 120) {
    currentX += Math.floor(Math.random() * 100) + 50; // 50 ~ 150 범위의 x 증가
    // x 좌표에 대한 clamp 처리
    if (currentX > 1500 - 110) {
      currentX = 1500 - 110;
    }

    currentY += Math.floor(Math.random() * 200) - 100; // -100 ~ 100 범위의 y 변경
    // y 좌표에 대한 clamp 처리
    if (currentY < 220) {
      currentY = 220;
    }
    if (currentY > 680 - 80) {
      currentY = 680 - 80;
    }

    path.push({ x: currentX, y: currentY });
  }
  return path;
}
