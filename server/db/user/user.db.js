import pools from '../database.js';
import { SQL_QUERIES } from './user.queries.js';

export const findUserByID = async (id) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_ID, [id]);
  const userCount = rows[0].userCount;
  return userCount > 0;
};

export const updateUserLogin = async (id) => {
  await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_LOGIN, [id]); // 해당 플레이어의 최고 기록
  await pools.USER_DB.query(SQL_QUERIES.UPDATE_HIGH_SCORE, [id]); // 전체 플레이어의 최고 기록
};

export const updateUserScore = async (score, id) => {
  await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_SCORE, [score, id]);
};

export const registerUser = async (id, password) => {
  await pools.USER_DB.query(SQL_QUERIES.INSERT_USER, [id, password]);
};

export const getPasswordById = async (id) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_PASSWORD_BY_ID, id);
  return rows[0]?.password || null;
};
