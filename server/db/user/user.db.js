import pools from '../database.js';
import { SQL_QUERIES } from './user.queries.js';

export const findUserByID = async (id) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_ID, [id]);
  const userCount = rows[0].userCount;
  return userCount > 0;
};

export const registerUser = async (id, password) => {
  await pools.USER_DB.query(SQL_QUERIES.INSERT_USER, [id, password]);
};

export const getPasswordById = async (id) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_PASSWORD_BY_ID, id);
  return rows[0]?.password || null;
};

export const getHighScoreByUserId = async (id) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.GET_HIGH_SCORE_BY_USER_ID, id);
  return rows[0]?.high_score || 0;
};

export const getMaxHighScore = async () => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.GET_MAX_HIGH_SCORE);
  return rows[0]?.high_score || 0;
};

export const updateUserScore = async (score, id) => {
  await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_SCORE, [score, id]);
};
