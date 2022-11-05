import { check } from 'express-validator';
import { checkString } from './validationFactory.js';

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

const checkDifferentPassword = () => async (req, res, next) => {
  const { password, currentPassword } = req.body;
  await checkString('password', 6)
    .bail()
    .custom((value) => currentPassword !== password)
    .withMessage('New password must be different from current password.')
    .run(req);
  return next();
};

export const validateChangingPassword = () => [
  checkString('currentPassword', 6),
  checkDifferentPassword(),
  checkConfirmPassword(),
];
