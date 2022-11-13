import express from 'express';
import { protect } from '../middlewares/authMiddlewares.js';
import validate from '../middlewares/validate.js';
import { validateChangingPassword } from '../validations/meValidations.js';
import { changePassword } from '../controllers/meController.js';
import { getUser } from '../controllers/userController.js';
import { getCurrentId } from '../middlewares/meMiddlewares.js';

const router = express.Router();

router.use(protect);

router.get('/info', getCurrentId, getUser);

router.post(
  '/change_password',
  validate(validateChangingPassword),
  changePassword
);

export default router;
