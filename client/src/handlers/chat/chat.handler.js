import { sendEvent } from '../../multi_game.js';

document.querySelector('#chat_submit').addEventListener('click', () => {
  const message = document.querySelector('#chat_input').value;
  if (!message) {
    return;
  }

  sendEvent(31, message);
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
};
