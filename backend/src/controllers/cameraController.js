import {
  deleteOne,
  updateOne,
  getOne,
  getAll,
  createOne,
} from './handlerFactory.js';
import Camera from '../models/cameraModel.js';

export const getAllCameras = getAll(Camera);

export const getCamera = getOne(Camera);

export const createCamera = createOne(Camera);

export const updateCamera = updateOne(Camera);

export const deleteCamera = deleteOne(Camera);
