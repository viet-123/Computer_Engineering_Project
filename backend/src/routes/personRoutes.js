import express from 'express';
import { protect } from '../middlewares/authMiddlewares.js';
import {
  getAllPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
} from '../controllers/personController.js';

const router = express.Router();

router.use(protect);

router.get('/', getAllPersons);

router.get('/:id', getPerson);

router.post('/', createPerson);

router.patch('/:id', updatePerson);

router.delete('/:id', deletePerson);

export default router;
