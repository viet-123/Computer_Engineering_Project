import express from 'express';
import { signup, login } from '../controllers/authController.js';
import validate from '../middlewares/validate.js';
import { cleanSignedUpObject } from '../middlewares/authMiddlewares.js';
import {
  validateSigningUp,
  validateLoggingIn,
} from '../validations/authValidations.js';

const router = express.Router();

router.post(
  '/signup',
  cleanSignedUpObject,
  validate(validateSigningUp),
  signup
);

router.post('/login', validate(validateLoggingIn), login);

export default router;
