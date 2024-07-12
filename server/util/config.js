//중앙 집중식 변수 관리
import dotenv from 'dotenv';

dotenv.config();

const configs = {
  serverPort: process.env.PORT,
  serverHost: process.env.HOST,
  jwtSecret: process.env.JWT_SECRET,
  databases: {
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbPort: process.env.DB_PORT,
    dbName:process.env.DB_NAME,
  },
};

export default configs;
