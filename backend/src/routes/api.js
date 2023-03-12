import express from 'express';
import authRouter from './authRoutes.js';
import meRouter from './meRoutes.js';
import personRouter from './personRoutes.js';
import turnRouter from './turnRoutes.js';
import userRouter from './userRoutes.js';

const api = express.Router();

api.use('/auth', authRouter);
api.use('/me', meRouter);
api.use('/person', personRouter);
api.use('/turn', turnRouter);
api.use('/user', userRouter);

export default api;
