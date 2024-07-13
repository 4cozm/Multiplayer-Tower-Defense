// import { CLIENT_VERSION } from '../constants.js';
import { deletePlayerFromMatchModel } from '../models/match.model.js';
import { removeUser } from '../models/user.model.js';
import handlerMappings from './handlerMapping.js';
import configs from '../util/config.js';
// import { getHightScoreUsers } from '../models/score.model.js';
import jwt from 'jsonwebtoken';

export const handleDisconnect = (socket) => {
  deletePlayerFromMatchModel(socket); // 매칭 대기열에 있었다면 대기열에서 삭제
  removeUser(socket.id); //소켓에서 삭제
};

export const handleConnection = (socket) => { //비동기로 실행 시켜서 로그인이 완전히 끝나야 다른 작업이 시작되도록 함
  return new Promise((resolve, reject) => {
    // 토큰 추출: WebSocket 쿼리 파라미터에서 토큰을 가져옵니다.
    const token = socket.handshake.auth.token;
    const jwtSecret = configs.jwtSecret;
    if (!token) {
      // 토큰이 없으면 연결 종료
      socket.disconnect();
      reject(new CustomError('토큰이 존재하지 않습니다 로그인을 해 주세요', ErrorCodes.HAVE_NO_TOKEN));
    } else {
      jwt.verify(token, jwtSecret, (err, tokenPayload) => {
        if (err) {
          socket.disconnect();
          reject(new CustomError('JWT 검증중 오류 발생', ErrorCodes.JWT_VERIFY_FAILED));
        } else {
          socket.data = {
            userId: tokenPayload.userId,
          };
          resolve();
        }
      });
    }
  });
};

export const handlerEvent = (socket, data, io) => {
  if (!CLIENT_VERSION.includes(data.clientVersion)) {
    socket.emit('response', { status: 'fail', message: 'Client version mismatch!' });
    return;
  }

  const handler = handlerMappings[data.handlerId];
  if (!handler) {
    socket.emit('response', { status: 'fail', message: 'Handler not found' });
    return;
  }

  const response = handler(data.userId, data.payload, socket, io);

  // 유저 한명에게만 보내는 정보
  socket.emit('response', response);
};
