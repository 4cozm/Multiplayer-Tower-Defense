import { Server as SocketIO } from 'socket.io';
import registerHandler from '../handler/register.handler.js';

const initSocket = (server) => {
  const io = new SocketIO(server, {
    cors: {
      origin: ['http://localhost:5500','http://127.0.0.1:5500'], // 도메인 허용
      methods: ['GET', 'POST'], // 허용할 HTTP 메서드
      credentials: true, // 자격 증명 허용
    },
  });
  io.attach(server);
  // 클라이언트로부터 오는 이벤트를 처리할 핸들러를 서버에 등록
  registerHandler(io);
};

export default initSocket;
