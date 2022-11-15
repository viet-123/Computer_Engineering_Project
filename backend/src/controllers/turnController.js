import {
  deleteOne,
  updateOne,
  getOne,
  getAll,
  createOne,
} from './handlerFactory.js';
import Turn from '../models/turnModel.js';

export const getAllTurns = getAll(Turn, 'person');

export const getTurn = getOne(Turn, 'person');

export const createTurn = createOne(Turn);

export const updateTurn = updateOne(Turn);

export const deleteTurn = deleteOne(Turn);
