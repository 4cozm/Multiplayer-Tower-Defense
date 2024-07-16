const myEmoji = document.querySelector('#emoji_container');
const myImage = document.querySelector('#emoji');
const oppoEmoji = document.querySelector('#opponent_emoji_container');
const oppoImage = document.querySelector('#opponent_emoji');
const myCanvas = document.getElementById('gameCanvas');
const opponentCanvas = document.getElementById('opponentCanvas');

import { sendEvent } from '../../multi_game.js';
let process = false;
let opponentProcess = false;

export const opponentEmoji = (data) => {
  // 정규식을 사용하여 앞부분 제거 (client가 있을 경우 제거)
  const relativePath = data.replace(/^(http:\/\/[^\/]+\/)(client\/)?/, '');
  if (opponentProcess) return;
  opponentShowEmoji(relativePath);
};

export const opponentMoveEmoji = (position) => {
  const { x, y } = position;
  moveEmojiContainerToCanvasCoords(opponentCanvas, x, y, oppoEmoji);
};

export const moveEmoji = (position) => {
  const { x, y } = position;
  moveEmojiContainerToCanvasCoords(myCanvas, x, y, myEmoji);
};

document.addEventListener('keydown', (event) => {
  if (process) return; // 프로세스가 진행 중이면 중복 실행 방지
  const keyName = event.key;
  if (!['1', '2', '3', '4'].includes(keyName)) return; // 키가 1, 2, 3, 4가 아니면 반환
  switch (keyName) {
    case '1':
      myImage.src = 'images/emoji/1.png';
      showEmoji();
      break;
    case '2':
      myImage.src = 'images/emoji/2.png';
      showEmoji();
      break;
    case '3':
      myImage.src = 'images/emoji/3.png';
      showEmoji();
      break;
    case '4':
      myImage.src = 'images/emoji/4.png';
      showEmoji();
      break;
  }
  sendEvent(100, { image: myImage.src });
});

function showEmoji() {
  process = true;
  myEmoji.style.display = 'block';

  // 3초 후에 서서히 사라지기
  myEmoji.style.transition = 'opacity 1s ease';
  myEmoji.style.opacity = '1';

  setTimeout(() => {
    myEmoji.style.opacity = '0';
  }, 0);

  setTimeout(() => {
    myEmoji.style.display = 'none';
    process = false;
  }, 1000);
}

function opponentShowEmoji(src) {
  opponentProcess = true;
  oppoImage.src = src;
  oppoEmoji.style.display = 'block';

  oppoEmoji.style.transition = 'opacity 1s ease';
  oppoEmoji.style.opacity = '1';

  // 애니메이션 시작 후 즉시 opacity를 0으로 설정
  setTimeout(() => {
    oppoEmoji.style.opacity = '0';
  }, 50); // 50ms 정도의 지연

  // 애니메이션이 끝날 때 display를 none으로 설정
  oppoEmoji.addEventListener(
    'transitionend',
    () => {
      if (oppoEmoji.style.opacity === '0') {
        oppoEmoji.style.display = 'none';
        opponentProcess = false;
      }
    },
    { once: true },
  );
}

function moveEmojiContainerToCanvasCoords(canvas, x, y, container) {
  // canvas의 위치를 가져옵니다.
  const rect = canvas.getBoundingClientRect();

  // canvas의 상대적인 x, y 좌표를 계산합니다.
  const emojiX = rect.left + x; // canvas의 왼쪽 위치에 x 좌표를 더합니다.
  const emojiY = rect.top + y; // canvas의 위쪽 위치에 y 좌표를 더합니다.

  // 이모티콘 컨테이너의 위치를 설정합니다.
  container.style.left = `${emojiX}px`;
  container.style.top = `${emojiY}px`;
}
