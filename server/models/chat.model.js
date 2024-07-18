import CustomError from '../util/error/customError.js';
import { ErrorCodes } from '../util/error/errorCodes.js';

const chatModel = [];
const filterChatModel = ['TIL', '코드카타', '출석체크'];
const filterModel = ['***', '****', '****'];

export const addChat = (userId, message) => {
  if (!userId || !message) {
    throw new CustomError(ErrorCodes.ADD_CHAT_QUEUE_FAILED, '챗에 등록하기 위한 정보가 누락되었습니다');
  }

  const checkedMessage = checkChat(message);
  const chat = { userId, checkedMessage };

  chatModel.push(chat);
  return checkedMessage;
};

export const getChat = () => {
  // 조회
  return chatModel;
};

function checkChat(message) {
  for (let i = 0; i < filterChatModel.length; i++) {
    if (message.includes(filterChatModel[i])) {
      message = message.replaceAll(filterChatModel[i], filterModel[i]);
      console.log('비속어 감지 변경:', message);
    }
  }

  return message;
}
