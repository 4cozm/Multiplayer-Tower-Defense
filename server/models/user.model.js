const users = [];

export const addUser = (userId, init, socket) => {
  console.log('Received init object:', init);
  const newUser = {
    userId: userId,
    userGold: init.data.userGold,
    baseHp: init.data.baseHp,
    towerCost: init.data.towerCost,
    numOfInitialTowers: init.data.numOfInitialTowers,
    monsterLevel: init.data.monsterLevel,
    monsterSpawnInterval: init.data.monsterSpawnInterval,
    score: init.data.score,
    highScore: 0,
    socketId: socket.id,
  };
  users[userId] = newUser;
};

export const removeUser = (socketId) => {
  const index = users.findIndex((user) => user.socketId === socketId);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const getUser = () => {
  return users;
};

export const getUserById = (token) => {
  return users[token];
};
