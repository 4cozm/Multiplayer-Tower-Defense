import { CLIENT_VERSION } from '../constants.js';
import { deletePlayerFromMatchModel, deleteMatchedPlayer } from '../models/match.model.js';
import { removeUser } from '../models/user.model.js';
import handlerMappings from './handlerMapping.js';
import configs from '../util/config.js';
import jwt from 'jsonwebtoken';
import CustomError from '../util/error/customError.js';
import { ErrorCodes } from '../util/error/errorCodes.js';

export const handleDisconnect = (socket, io) => {
  deletePlayerFromMatchModel(socket); // 매칭 대기열에 있었다면 대기열에서 삭제
  deleteMatchedPlayer(socket, io); // 매칭 이후 탈주 시
  removeUser(socket.id); //서버에서 관리하는 유저 객체에서 삭제
  console.log('클라이언트 연결 해제됨', socket.id);
};

export const handleConnection = (socket) => {
  //비동기로 실행 시켜서 로그인이 완전히 끝나야 다른 작업이 시작되도록 함
  return new Promise((resolve, reject) => {
    // 토큰 추출: WebSocket 쿼리 파라미터에서 토큰을 가져옵니다.
    const token = socket.handshake.auth.token;
    const jwtSecret = configs.jwtSecret;
    if (!token) {
      // 토큰이 없으면 연결 종료
      socket.disconnect();
      reject(new CustomError(ErrorCodes.HAVE_NO_TOKEN, '토큰이 존재하지 않습니다 로그인을 해 주세요'));
    } else {
      jwt.verify(token, jwtSecret, (err, tokenPayload) => {
        if (err) {
          socket.disconnect();
          reject(new CustomError(ErrorCodes.JWT_VERIFY_FAILED, 'JWT 검증중 오류 발생'));
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
    throw new CustomError(ErrorCodes.CLIENT_VERSION_MISMATCH, 'Client version mismatch!');
  }

  const handler = handlerMappings[data.handlerId];
  if (!handler) {
    throw new CustomError(ErrorCodes.UNKNOWN_HANDLER_ID, 'Handler not found');
  }

  const response = handler(data.userId, data.payload, socket, io);

  socket.emit('response', response);
};
