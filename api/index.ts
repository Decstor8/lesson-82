import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import config from './config';
import artistRouter from './routers/Artist';
import albumRouter from './routers/Albums';
import trackRouter from './routers/Tracks';

const app = express();
const port = 8000;``

app.use(express.json());
app.use(cors());

app.use('/artists', artistRouter);
app.use('/albums', albumRouter);
app.use('/tracks', trackRouter);

const run = async () => {
    await  mongoose.connect(config.mongoose.db)
  
    app.listen(port, () => {
      console.log(`Сервер стартовал на ${port} порту`);
    });
  
    process.on('exit', () => {
      mongoose.disconnect();
    });
  };
  
  void run();