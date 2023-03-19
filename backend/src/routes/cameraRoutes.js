import express from 'express';
import { protect } from '../middlewares/authMiddlewares.js';
import {
  getAllCameras,
  getCamera,
  createCamera,
  updateCamera,
  deleteCamera,
} from '../controllers/cameraController.js';

const router = express.Router();

router.use(protect);

router.get('/', getAllCameras);

router.post('/', createCamera);

router.get('/:id', getCamera);

router.patch('/:id', updateCamera);

router.delete('/:id', deleteCamera);

export default router;
