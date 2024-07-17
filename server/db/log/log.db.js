import pools from '../database.js';
import { SQL_QUERIES } from './log.queries.js';

export const setLog = async (id, log) => {
  await pools.USER_DB.query(SQL_QUERIES.INSERT_LOG, [id, log]);
};
