export const SQL_QUERIES = {
  FIND_USER_BY_ID: 'SELECT high_score FROM user WHERE id = ?',
  UPDATE_USER_LOGIN: 'UPDATE user SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
  UPDATE_HIGH_SCORE: 'SELECT MAX(high_score) FROM user;',
  UPDATE_USER_SCORE: 'UPDATE user SET high_score = ? WHERE id = ?',
};
