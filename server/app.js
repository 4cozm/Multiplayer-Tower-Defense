import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { getGameAssets, loadGameAssets } from '../server/init/assets.js';
import accountRouter from './routes/user.router.js';
import configs from './util/config.js';
import initSocket from './init/socket.js';

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('client'));
initSocket(server);

app.use('/', accountRouter);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(configs.serverPort, async () => {
  await loadGameAssets();
  const address = server.address();
  const host = address.address === '::' ? 'localhost' : address.address; // IPv6의 ::는 localhost를 의미함
  const port = address.port;
  console.log(`Server가 http://${host}:${port} 에서 열렸습니다`);
});
