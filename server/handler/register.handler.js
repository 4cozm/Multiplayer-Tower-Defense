import { addUser } from '../models/user.model.js';
import { handleConnection, handleDisconnect, handlerEvent } from './helper.js';
import { getGameAssets } from '../init/assets.js';
import { matchGame } from './match.handler.js';
import { ErrorCodes } from '../util/error/errorCodes.js';
import CustomError from '../util/error/customError.js';
import configs from '../util/config.js';

const registerHandler = (io) => {
  io.on('connection', (socket) => {
    const token = socket.handshake.auth.token;
    const jwtSecret = configs.jwtSecret;
    if (!token) {
      //토큰이 없으면 연결 종료
      throw new CustomError('토큰이 존재하지 않습니다 로그인을 해 주세요', ErrorCodes.HAVE_NO_TOKEN);
    }
    jwt.verify(token, jwtSecret, (err, tokenPayload) => {
      if (err) throw new CustomError('JWT 검증중 오류 발생', ErrorCodes.JWT_VERIFY_FAILED);
      console.log('JWT 검증 성공');
      socket.data = {
        user_id: tokenPayload.user_id,
      };
    });
    const { init } = getGameAssets();

    addUser(token, init, socket.id);
    handleConnection(socket, token);

    // socket과 userId 대체 사용
    matchGame(socket, token, io);

    socket.on('event', (data) => handlerEvent(socket, data, io));
    socket.on('disconnect', (socket) => handleDisconnect(socket, token));
  });
};

export default registerHandler;
