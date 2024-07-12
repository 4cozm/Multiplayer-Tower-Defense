//중앙 집중식 변수 관리
import dotenv from 'dotenv';

dotenv.config();

const configs = {
  serverPort: process.env.PORT,
  serverHost: process.env.HOST,
  jwtSecret: process.env.JWT_SECRET,
};

export default configs;
