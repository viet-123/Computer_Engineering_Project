import express from 'express';
import { protect } from '../middlewares/authMiddlewares.js';
import {
  getAllBuildings,
  getBuilding,
  createBuilding,
  updateBuilding,
  deleteBuilding,
} from '../controllers/buildingController.js';

const router = express.Router();

router.use(protect);

router.get('/', getAllBuildings);

router.post('/', createBuilding);

router.get('/:id', getBuilding);

router.patch('/:id', updateBuilding);

router.delete('/:id', deleteBuilding);

export default router;
