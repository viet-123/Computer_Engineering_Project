import { check } from 'express-validator';
import User from '../models/userModel.js';
import { checkString, checkUniqueString } from './validationFactory.js';

const checkConfirmPassword = () => async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  if (password) {
    await check('confirmPassword')
      .exists()
      .withMessage('Confirm password is required.')
      .bail()
      .isLength({ min: 6 })
      .withMessage('Confirm password must be at least 6 chars long.')
      .bail()
      .custom((value) => password === confirmPassword)
      .withMessage('Passwords do not match.')
      .run(req);
  }
  return next();
};

export const validateSigningUp = () => [
  checkUniqueString('username', 6, User),
  checkString('password', 6),
  checkConfirmPassword(),
];

export const validateLoggingIn = () => [
  checkString('email', 6),
  checkString('password', 6),
];
