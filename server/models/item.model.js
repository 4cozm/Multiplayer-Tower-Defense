const items = {};

export const addItems = (userId, itemId) => {
  if (!items[userId]) {
    items[userId] = [];
  }
  items[userId][itemId] = { itemId, timestamp: Date.now() };
};

export const getBuyItems = (userId) => {
  return items[userId];
};
