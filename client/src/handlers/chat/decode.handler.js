import * as chat from '../../../../server/protobuf/chatProtobuf.js';

let chatting = { user: 'user1', message: 'hello' };

let test1 = chat.encodeChatMessage(chatting);

console.log(test1);

let test2 = chat.decodeChatMessage(test1);

console.log(test2);
