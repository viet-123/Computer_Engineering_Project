import express from 'express';
import { protect } from '../middlewares/authMiddlewares.js';
import {
  getAllTurns,
  getTurn,
  createTurn,
  updateTurn,
  deleteTurn,
} from '../controllers/turnController.js';

const router = express.Router();

router.use(protect);

router.get('/', getAllTurns);

router.post('/', createTurn);

router.get('/:id', getTurn);

router.patch('/:id', updateTurn);

router.delete('/:id', deleteTurn);

export default router;
