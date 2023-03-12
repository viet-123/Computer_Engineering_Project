import express from 'express';
import { protect } from '../middlewares/authMiddlewares.js';
import validate from '../middlewares/validate.js';
import {
  validateCreatingUser,
  validateUpdatingUser,
} from '../validations/userValidations.js';
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router.use(protect);

router.get('/', getAllUsers);

router.post('/', validate(validateCreatingUser), createUser);

router.get('/:id', getUser);

router.patch('/:id', validate(validateUpdatingUser), updateUser);

router.delete('/:id', deleteUser);

export default router;
