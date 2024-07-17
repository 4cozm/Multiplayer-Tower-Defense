import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export let gameAssets = {}; //loadGameAssets 쓰면 이상하게 작동하지 않음..

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 최상위 경로 + assets 폴더
const basePath = path.join(__dirname, '../assets');

// 파일 읽는 함수
// 비동기 병렬로 파일을 읽는다.
const readFileAsync = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(basePath, filename), 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data));
    });
  });
};

export const loadGameAssets = async () => {
  try {
    // 사용할 asset 작성
    const [init, itemData, levelsData, towerData] = await Promise.all([
      readFileAsync('init.json'),
      readFileAsync('item.json'),
      readFileAsync('level.json'),
      readFileAsync('tower.json'),
    ]);

    gameAssets = { init, itemData, levelsData, towerData };
    console.log('JSON 데이터 로드 완료!');
  } catch (e) {
    throw new Error('Failed to load game assets: ' + e.message);
  }
};

export const getGameAssets = () => {
  return gameAssets;
};
