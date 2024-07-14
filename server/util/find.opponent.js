/**
 * 현재 경기중인 상대방의 socketID를 반환하는 함수
 * @param {socket} socket
 */
const findOpponent = (socket) => {
  const rooms = socket.nsp.adapter.rooms; // 방 정보를 가져옴

  for (const [roomId, sockets] of rooms) {
    if (sockets.has(socket.id)) {
      // 현재 소켓이 방에 있는지 확인
      for (const id of sockets) {
        // 방의 모든 소켓 ID를 순회
        if (id !== socket.id) {
          // 자신이 아닌 경우
          return id; // 상대의 socket.id 반환
        }
      }
    }
  }
  return null; // 상대가 없을 경우 null 반환
};

export default findOpponent;
