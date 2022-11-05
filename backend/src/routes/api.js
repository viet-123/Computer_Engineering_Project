import express from 'express';
import authRouter from './authRoutes.js';
import meRouter from './meRoutes.js';

const api = express.Router();

api.use('/auth', authRouter);
api.use('/me', meRouter);

export default api;
