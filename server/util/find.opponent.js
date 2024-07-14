/**
 * 현재 경기중인 상대방의 socketID를 반환하는 함수
 * @param {socket} socket
 * @param {io} io
 */
const findOpponent = (socket, io) => {
  const room = io.sockets.adapter.rooms.get(socket.rooms);

  console.log(room);
};
