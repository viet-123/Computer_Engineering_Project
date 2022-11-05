import {
  deleteOne,
  updateOne,
  getOne,
  getAll,
  createOne,
} from './handlerFactory.js';
import Person from '../models/personModel.js';

export const getAllPersons = getAll(Person);

export const getPerson = getOne(Person);

export const createPerson = createOne(Person);

export const updatePerson = updateOne(Person);

export const deletePerson = deleteOne(Person);
