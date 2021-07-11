import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import { config } from './config.js';
import { initSocket } from './connection/socket.js';
import { connectDB } from './database/database.js';

const app = express();

//cors option - 210711
// const corsOption = { 
//   origin: config.cors.allowedOrigin,
//   optionsSuccessStatus: 200,
// }

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

// sequelize.sync().then(() => {
//   //로그 
//   console.log(`Server is start!!! ${new Date()}`)
//   const server = app.listen(config.port);
//   initSocket(server);
// })

/***********************************

  db 설정 

*********************************** */

//커넥이 잘된다면 
connectDB()
  .then(() => {
     console.log('init');
    const server = app.listen(config.host.port);
    initSocket(server);
  }) // 커넥이 안된다면 에러 출력  
  .catch(console.error);
