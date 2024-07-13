const connectionTest = (userId, payload, socket, io) => {
  io.to(payload.opponent).emit('TEST', payload.testMessage);
};

export default connectionTest;
