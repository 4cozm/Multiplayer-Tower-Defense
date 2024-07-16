document.querySelector('#chat_submit').addEventListener('click', () => {
  const message = document.querySelector('#chat_input').value;
  if (!message) {
    return;
  }

  //메세지 직렬화 -> 서버로 보낸다 sendEvent(200,messsage);;
});

//서버에서 id랑 메세지를 받았다

const makeChat = (data, game) => {
  const { userId, message } = data;
  const chatElement = document.createElement('p');
  chatElement.className = 'chat';
  if (userId == 0) {
    //game.userId
    chatElement.className = 'chat_right';
    chatElement.textContent = `${message}`;
  } else {
    chatElement.textContent = `${userId}:${message}`;
  }
  const chatBody = document.querySelector('#chat_body');
  chatBody.appendChild(chatElement);
};
