import express from 'express';
import { protect } from '../middlewares/authMiddlewares.js';
import validate from '../middlewares/validate.js';
import {
  validateCreatingTurn,
  validateUpdatingTurn,
} from '../validations/turnValidations.js';
import {
  getAllTurns,
  getTurn,
  createTurn,
  updateTurn,
  deleteTurn,
  statsTurn,
} from '../controllers/turnController.js';

const router = express.Router();

router.use(protect);

router.get('/', getAllTurns);

router.post('/', validate(validateCreatingTurn), createTurn);

router.get('/stats', statsTurn);

router.get('/:id', getTurn);

router.patch('/:id', validate(validateUpdatingTurn), updateTurn);

router.delete('/:id', deleteTurn);

export default router;
