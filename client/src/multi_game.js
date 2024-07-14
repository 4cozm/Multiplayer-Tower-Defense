import { Base } from './class/base.js';
import { Monster } from './class/monster.js';
import { Tower } from './class/tower.js';
import Game from './class/Game.js';
import eventHandler from './handlers/index.js';

if (!localStorage.getItem('token')) {
  alert('로그인이 필요합니다.');
  location.href = '/login';
}

export let game; // 핸들러의 index.js에서 사용하기 위해 export함
let serverSocket;
let init = false; //inital 데이터가 커서 재전송 받는 문제가 있는듯 하여 생성

const CLIENT_VERSION = '1.0.0';

const canvas = document.getElementById('gameCanvas');
export const ctx = canvas.getContext('2d');

const opponentCanvas = document.getElementById('opponentCanvas');
const opponentCtx = opponentCanvas.getContext('2d');

const progressBarContainer = document.getElementById('progressBarContainer');
const progressBarMessage = document.getElementById('progressBarMessage');
const progressBar = document.getElementById('progressBar');
const loader = document.getElementsByClassName('loader')[0];

const NUM_OF_MONSTERS = 5; // 몬스터 개수

// 이미지 로딩 파트
const backgroundImage = new Image();
backgroundImage.src = 'images/bg.webp';

export const towerImage = new Image();
towerImage.src = 'images/tower.png';

const baseImage = new Image();
baseImage.src = 'images/base.png';

const pathImage = new Image();
pathImage.src = 'images/path.png';

const monsterImages = [];
for (let i = 1; i <= NUM_OF_MONSTERS; i++) {
  const img = new Image();
  img.src = `images/monster${i}.png`;
  monsterImages.push(img);
}

let bgm;

function initMap() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // 배경 이미지 그리기
  opponentCtx.drawImage(backgroundImage, 0, 0, opponentCanvas.width, opponentCanvas.height);
  drawPath(game.monsterPath, ctx);
  drawPath(game.opponentMonsterPath, opponentCtx);
  // placeInitialTowers(initialTowerCoords, towers, ctx); // 초기 타워 배치
  // placeInitialTowers(opponentInitialTowerCoords, opponentTowers, opponentCtx); // 상대방 초기 타워 배치
  placeBase(game.basePosition, true);
  placeBase(game.opponentBasePosition, false);
}

function drawPath(path, context) {
  const segmentLength = 10; // 몬스터 경로 세그먼트 길이
  const imageWidth = 30; // 몬스터 경로 이미지 너비
  const imageHeight = 30; // 몬스터 경로 이미지 높이
  const gap = 3; // 몬스터 경로 이미지 겹침 방지를 위한 간격

  for (let i = 0; i < path.length - 1; i++) {
    const startX = path[i].x;
    const startY = path[i].y;
    const endX = path[i + 1].x;
    const endY = path[i + 1].y;

    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY); // 피타고라스 정리로 두 점 사이의 거리를 구함 (유클리드 거리)
    const angle = Math.atan2(deltaY, deltaX); // 두 점 사이의 각도를 tan-1(y/x)로 구해야 함 (자세한 것은 역삼각함수 참고): 삼각함수는 변의 비율! 역삼각함수는 각도를 구하는 것!

    for (let j = gap; j < distance - gap; j += segmentLength) {
      const x = startX + Math.cos(angle) * j; // 다음 이미지 x좌표 계산(각도의 코사인 값은 x축 방향의 단위 벡터 * j를 곱하여 경로를 따라 이동한 x축 좌표를 구함)
      const y = startY + Math.sin(angle) * j; // 다음 이미지 y좌표 계산(각도의 사인 값은 y축 방향의 단위 벡터 * j를 곱하여 경로를 따라 이동한 y축 좌표를 구함)
      drawRotatedImage(pathImage, x, y, imageWidth, imageHeight, angle, context);
    }
  }
}

function drawRotatedImage(image, x, y, width, height, angle, context) {
  context.save();
  context.translate(x + width / 2, y + height / 2);
  context.rotate(angle);
  context.drawImage(image, -width / 2, -height / 2, width, height);
  context.restore();
}

function getRandomPositionNearPath(maxDistance) {
  const segmentIndex = Math.floor(Math.random() * (game.monsterPath.length - 1));
  const startX = game.monsterPath[segmentIndex].x;
  const startY = game.monsterPath[segmentIndex].y;
  const endX = game.monsterPath[segmentIndex + 1].x;
  const endY = game.monsterPath[segmentIndex + 1].y;

  const t = Math.random();
  const posX = startX + t * (endX - startX);
  const posY = startY + t * (endY - startY);

  const offsetX = (Math.random() - 0.5) * 2 * maxDistance;
  const offsetY = (Math.random() - 0.5) * 2 * maxDistance;

  return {
    x: posX + offsetX,
    y: posY + offsetY,
  };
}

function placeInitialTowers(initialTowerCoords, initialTowers, context) {
  initialTowerCoords.forEach((towerCoords) => {
    const tower = new Tower(towerCoords.x, towerCoords.y);
    initialTowers.push(tower);
    tower.draw(context, towerImage);
  });
}

function placeNewTower() {
  // 타워를 구입할 수 있는 자원이 있을 때 타워 구입 후 랜덤 배치
  if (game.userGold < game.towerCost) {
    alert('골드가 부족합니다.');
    return;
  }

  const { x, y } = getRandomPositionNearPath(200);

  //서버로 포탑 좌표 전달
  sendEvent(6, { x, y });
}

function placeBase(position, isPlayer) {
  if (isPlayer) {
    game.base = new Base(position.x, position.y, game.baseHp);
    game.base.draw(ctx, baseImage);
  } else {
    game.opponentBase = new Base(position.x, position.y, game.baseHp);
    game.opponentBase.draw(opponentCtx, baseImage, true);
  }
}

function spawnMonster() {
  //sendEvent(40, { monsterLevel, opponent }); // TODO. 서버로 몬스터 생성 이벤트 전송

  const newMonster = new Monster(
    game.monsterPath,
    monsterImages,
    game.monsterLevel,
    game.monsterID,
    game.monsterHp,
    game.monsterPower,
  );
  game.monsters.push(newMonster);
}

function gameLoop() {
  // 렌더링 시에는 항상 배경 이미지부터 그려야 합니다! 그래야 다른 이미지들이 배경 이미지 위에 그려져요!
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // 배경 이미지 다시 그리기
  drawPath(game.monsterPath, ctx); // 경로 다시 그리기

  ctx.font = '25px Times New Roman';
  ctx.fillStyle = 'skyblue';
  ctx.fillText(`최고 기록: ${game.highScore}`, 100, 50); // 최고 기록 표시
  ctx.fillStyle = 'white';
  ctx.fillText(`점수: ${game.score}`, 100, 100); // 현재 스코어 표시
  ctx.fillStyle = 'yellow';
  ctx.fillText(`골드: ${game.userGold}`, 100, 150); // 골드 표시
  ctx.fillStyle = 'black';
  ctx.fillText(`현재 레벨: ${game.monsterLevel}`, 100, 200); // 최고 기록 표시

  // 타워 그리기 및 몬스터 공격 처리
  game.towers.forEach((tower) => {
    tower.draw(ctx, towerImage);
    tower.updateCooldown();
    game.monsters.forEach((monster) => {
      const distance = Math.sqrt(Math.pow(tower.x - monster.x, 2) + Math.pow(tower.y - monster.y, 2));
      if (distance < tower.range) {
        tower.attack(monster);
      }
    });
  });

  // 몬스터가 공격을 했을 수 있으므로 기지 다시 그리기
  game.base.draw(ctx, baseImage);

  for (let i = game.monsters.length - 1; i >= 0; i--) {
    const monster = game.monsters[i];
    if (monster.hp > 0) {
      const Attacked = monster.move();
      if (Attacked) {
        const attackedSound = new Audio('sounds/attacked.wav');
        attackedSound.volume = 0.3;
        attackedSound.play();
        // TODO. 몬스터가 기지를 공격했을 때 서버로 이벤트 전송
        game.monsters.splice(i, 1);
      }
    } else {
      // TODO. 몬스터 사망 이벤트 전송
      game.monsters.splice(i, 1);
    }
  }

  // 상대방 게임 화면 업데이트
  opponentCtx.drawImage(backgroundImage, 0, 0, opponentCanvas.width, opponentCanvas.height);
  drawPath(game.opponentMonsterPath, opponentCtx); // 상대방 경로 다시 그리기

  game.opponentTowers.forEach((tower) => {
    tower.draw(opponentCtx, towerImage);
    tower.updateCooldown(); // 적 타워의 쿨다운 업데이트
  });

  game.opponentMonsters.forEach((monster) => {
    monster.move();
    monster.draw(opponentCtx, true);
  });

  game.opponentBase.draw(opponentCtx, baseImage, true);

  requestAnimationFrame(gameLoop); // 지속적으로 다음 프레임에 gameLoop 함수 호출할 수 있도록 함
}

function initGame() {
  if (game.isInitGame) {
    return;
  }
  bgm = new Audio('sounds/bgm.mp3');
  bgm.loop = true;
  bgm.volume = 0.2;
  bgm.play();

  initMap(); // 맵 초기화 (배경, 몬스터 경로 그리기)

  setInterval(spawnMonster, game.monsterSpawnInterval); // 설정된 몬스터 생성 주기마다 몬스터 생성
  gameLoop(); // 게임 루프 최초 실행
  game.isInitGame = true;
}

// 이미지 로딩 완료 후 서버와 연결하고 게임 초기화
Promise.all([
  new Promise((resolve) => (backgroundImage.onload = resolve)),
  new Promise((resolve) => (towerImage.onload = resolve)),
  new Promise((resolve) => (baseImage.onload = resolve)),
  new Promise((resolve) => (pathImage.onload = resolve)),
  ...monsterImages.map((img) => new Promise((resolve) => (img.onload = resolve))),
]).then(() => {
  serverSocket = io('http://127.0.0.1:5555', {
    auth: {
      token: localStorage.getItem('token'),
    },
  });
  serverSocket.on('connect_error', (err) => {
    if (err.message === 'Authentication error') {
      alert('잘못된 토큰입니다.');
      location.href = '/login';
    }
  });

  serverSocket.on('matchFound', (data) => {
    // 상대가 매치되면 3초 뒤 게임 시작
    progressBarMessage.textContent = '게임이 3초 뒤에 시작됩니다.';
    game = new Game(data.userId); //유저,상대방 정보가 담긴 인스턴스 객체

    let progressValue = 0;
    const progressInterval = setInterval(() => {
      progressValue += 10;
      progressBar.value = progressValue;
      progressBar.style.display = 'block';
      loader.style.display = 'none';

      if (progressValue >= 100) {
        clearInterval(progressInterval);
        progressBarContainer.style.display = 'none';
        progressBar.style.display = 'none';
        buyTowerButton.style.display = 'block';
        canvas.style.display = 'block';
        opponentCanvas.style.display = 'block';

        // TODO. 유저 및 상대방 유저 데이터 초기화
        sendEvent(10); // 유저 및 상대방 유저 데이터 요청 initializeGameState
        if (!game.isInitGame) {
          serverSocket.on('initializeGameState', (initialGameData) => {
            eventHandler.initializeGameState(initialGameData);

            console.log('게임 초기화 데이터:', game, '출력시간', Date.now()); //현재 클라이언트에서 이벤트 두번 받아오는 문제 있음
            initGame();
          });
        }
      }
    }, 300);
  });
  serverSocket.on('updateGameState', (syncData) => {
    console.log('Received sync data:', syncData);
    eventHandler.updateGameState(syncData);
  });

  // serverSocket.on('opponentUpdateGameState', (syncData) => { 상대방 변경사항
  //   opponentUpdateGameState(syncData);
  // });

  serverSocket.on('gameOver', (data) => {
    bgm.pause();
    const { isWin } = data;
    const winSound = new Audio('sounds/win.wav');
    const loseSound = new Audio('sounds/lose.wav');
    winSound.volume = 0.3;
    loseSound.volume = 0.3;
    if (isWin) {
      winSound.play().then(() => {
        alert('당신이 게임에서 승리했습니다!');
        // TODO. 게임 종료 이벤트 전송
        location.reload();
      });
    } else {
      loseSound.play().then(() => {
        alert('아쉽지만 대결에서 패배하셨습니다! 다음 대결에서는 꼭 이기세요!');
        // TODO. 게임 종료 이벤트 전송
        location.reload();
      });
    }
  });

  //타워 구입 이벤트
  serverSocket.on('makeTower', (data) => {
    eventHandler.makeTower(data);
  });
  serverSocket.on('opponentMakeTower', (data) => {
    eventHandler.makeOpponentTower(data);
  });

  //에러 이벤트
  serverSocket.on('error', (errorResponse) => {
    console.log('Received error:', errorResponse);
  });
});

/**
 * 1:matchGame :
 * 6:buyTower : 타워의 x,y 좌표
 *
 *
 *
 *
 * 999:connectionTest
 */
const sendEvent = (handlerId, payload) => {
  serverSocket.emit('event', {
    userId: game.userId,
    clientVersion: CLIENT_VERSION,
    handlerId,
    payload,
  });
};

const buyTowerButton = document.createElement('button');
buyTowerButton.textContent = '타워 구입';
buyTowerButton.style.position = 'absolute';
buyTowerButton.style.top = '10px';
buyTowerButton.style.right = '10px';
buyTowerButton.style.padding = '10px 20px';
buyTowerButton.style.fontSize = '16px';
buyTowerButton.style.cursor = 'pointer';
buyTowerButton.style.display = 'none';

buyTowerButton.addEventListener('click', placeNewTower);

document.body.appendChild(buyTowerButton);

// const opponentUpdateGameState = (syncData) => {
//   userGold = syncData.userGold !== undefined ? syncData.userGold : userGold;
//   baseHp = syncData.baseHp !== undefined ? syncData.baseHp : baseHp;
//   score = syncData.score !== undefined ? syncData.score : score;
//   monsterLevel = syncData.monsterLevel !== undefined ? syncData.monsterLevel : monsterLevel;
// };
