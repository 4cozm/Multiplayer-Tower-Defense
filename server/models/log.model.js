// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const errorLogs = {};

// export const logError = (userId, errorMessage) => {
//   if (!errorLogs[userId]) {
//     errorLogs[userId] = [];
//   }
//   errorLogs[userId].push(errorMessage);
// };

// export const saveErrorLogs = (userId) => {
//   if (errorLogs[userId] && errorLogs[userId].length > 0) {
//     const logDir = path.resolve(__dirname, 'log');
//     if (!fs.existsSync(logDir)) {
//       fs.mkdirSync(logDir);
//     }

//     const logFilePath = path.resolve(logDir, `${userId}.txt`);
//     const logContent = errorLogs[userId].join('\n');

//     fs.writeFileSync(logFilePath, logContent);

//     // 로그 저장 후 객체에서 해당 UUID의 에러 로그 삭제
//     delete errorLogs[userId];
//   }
// };
