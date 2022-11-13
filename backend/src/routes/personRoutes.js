import express from 'express';
import { protect } from '../middlewares/authMiddlewares.js';
import validate from '../middlewares/validate.js';
import {
  validateCreatingPerson,
  validateUpdatingPerson,
} from '../validations/personValidations.js';
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

router.post('/', validate(validateCreatingPerson), createPerson);

router.get('/:id', getPerson);

router.patch('/:id', validate(validateUpdatingPerson), updatePerson);

router.delete('/:id', deletePerson);

export default router;
