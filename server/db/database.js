import mysql from 'mysql2/promise';
import configs from '../util/config.js';
import formatDate from '../util/dataFormatter.js';
const { databases } = configs;


const createPool = (dbConfig) => {
  const pool = mysql.createPool({
    host: dbConfig.dbHost,
    port: dbConfig.dbPort,
    user: dbConfig.dbUser,
    password: dbConfig.dbPassword,
    database: dbConfig.dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  const originalQuery = pool.query;

  pool.query = (sql, params) => {
    const date = new Date();
    // 쿼리 실행시 로그
    console.log(`[${formatDate(date)}] Executing query: ${sql} ${params ? `, ${JSON.stringify(params)}` : ``}`);
    return originalQuery.call(pool, sql, params);
  };

  return pool;
};

const pools = {
  USER_DB: createPool(databases),
};

export default pools;
