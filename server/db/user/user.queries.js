export const SQL_QUERIES = {
  FIND_USER_BY_ID: 'SELECT COUNT(*) AS userCount FROM user WHERE id = ?',
  INSERT_USER:
    'INSERT INTO user (id, password, high_score, last_login, created_at) VALUES (?, ?, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
  FIND_PASSWORD_BY_ID: 'SELECT password FROM user WHERE id = ?',
  GET_HIGH_SCORE_BY_USER_ID: 'SELECT high_score FROM user WHERE id = ?',
  GET_MAX_HIGH_SCORE: 'SELECT MAX(high_score) AS high_score FROM user',
  UPDATE_USER_SCORE: 'UPDATE user SET high_score = ? WHERE id = ?',
};
