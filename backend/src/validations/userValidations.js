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

export const validateCreatingUser = () => [
  checkUniqueString('username', 6, User),
  checkString('password', 6),
  checkConfirmPassword(),
];

export const validateUpdatingUser = () => [
  checkUniqueString('username', 6, User),
  checkUniqueString('password', 6),
  checkConfirmPassword(),
];
