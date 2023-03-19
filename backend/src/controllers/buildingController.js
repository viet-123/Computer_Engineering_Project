import {
  deleteOne,
  updateOne,
  getOne,
  getAll,
  createOne,
} from './handlerFactory.js';
import Building from '../models/buildingModel.js';

export const getAllBuildings = getAll(Building, 'cameras');

export const getBuilding = getOne(Building, 'cameras');

export const createBuilding = createOne(Building);

export const updateBuilding = updateOne(Building);

export const deleteBuilding = deleteOne(Building);
