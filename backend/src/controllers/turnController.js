import {
  deleteOne,
  updateOne,
  getOne,
  getAll,
  createOne,
} from './handlerFactory.js';
import Turn from '../models/turnModel.js';

export const getAllTurns = getAll(Turn);

export const getTurn = getOne(Turn);

export const createTurn = createOne(Turn);

export const updateTurn = updateOne(Turn);

export const deleteTurn = deleteOne(Turn);
