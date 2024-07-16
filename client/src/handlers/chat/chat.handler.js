import { sendEvent } from '../../multi_game.js';
const chatOpenButton = document.querySelector('#chat_open_btn');
const submit = document.querySelector('#chat_submit');
let chatBodyVisible = false;
const xButton = document.querySelector('#chat_x');

xButton.addEventListener('click', () => {
  document.querySelector('#chat_container').style.display = 'none';
  chatBodyVisible = false;
});

chatOpenButton.addEventListener('click', () => {
  document.querySelector('#chat_container').style.display = 'flex';
  chatBodyVisible = true;
});

submit.addEventListener('click', () => {
  const message = document.querySelector('#chat_input');
  if (!message.value) {
    return;
  }
  sendEvent(31, message.value);
  message.value = '';
});
document.addEventListener('keydown', (event) => {
  console.log('키다운:', event);
  if (event.key === 'Enter' && chatBodyVisible) {
    console.log('채팅 열려있고 엔터키 입력되어 메세지 바로 보냄');
    const message = document.querySelector('#chat_input');
    if (!message.value) {
      message.focus();
      return;
    }
    sendEvent(31, message.value);
    message.value = '';
    message.focus();
  } else if (event.key === 'Enter') {
    console.log('채팅창은 닫혀있지만 엔터키 입력하여 채팅창 꺼내기');
    document.querySelector('#chat_container').style.display = 'flex';
    chatBodyVisible = true;
    document.querySelector('#chat_input').focus();
  }
});

//서버에서 id랑 메세지를 받았다

export const makeChat = (data, game) => {
  const { userId, message } = data;
  const chatElement = document.createElement('p');
  chatElement.className = 'chat';
  if (userId == game.userId) {
    //game.userId
    chatElement.className = 'chat_right';
    chatElement.textContent = `${message}`;
  } else {
    chatElement.textContent = `${userId}:${message}`;
  }
  const chatBody = document.querySelector('#chat_body');
  chatBody.appendChild(chatElement);
  chatBody.scrollTop = chatBody.scrollHeight;
  if (!chatBodyVisible) {
    document.querySelector('#chat_container').style.display = 'flex';
    chatBodyVisible = true;
  }
};
