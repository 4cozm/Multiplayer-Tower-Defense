import { addUser } from '../models/user.model.js';
import { handleConnection, handleDisconnect, handlerEvent } from './helper.js';
import { getGameAssets } from '../init/assets.js';
import { matchGame } from './match.handler.js';


const registerHandler = (io) => {
  io.on('connection', async (socket) => {
    console.log('클라이언트 연결됨', socket.id);
    const { init } = getGameAssets();

    try {
      await handleConnection(socket); // JWT 토큰 인증 완료 후 진행 이거 끝나야 나머지 코드가 작동
      const userId = socket.data.userId;
      addUser(userId, init, socket.id);

      matchGame(userId, socket, io);
    } catch (error) {
      console.error('연결 에러:', error.message);
      socket.emit('connect_error', error);
    }

    socket.on('event', (data) => handlerEvent(socket, data, io));
    socket.on('disconnect', () => handleDisconnect(socket, io)); //socket 객체를 직접 사용해야 함
  });
};

export default registerHandler;
