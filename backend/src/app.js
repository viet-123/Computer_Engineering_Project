import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import api from './routes/api.js';
import globalErrorHandler from './controllers/errorController.js';
import AppError from './utils/appError.js';
import path from 'path';

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan('tiny'));

app.use('/api', api);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, './frontend/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/build/index.html'));
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
