import { validationResult } from 'express-validator';
import AppError from '../utils/appError.js';

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  let extractedError = {};
  errors.array().forEach((err) => {
    if (extractedError[err.param]) {
      extractedError[err.param].push(err.msg);
    } else {
      extractedError[err.param] = [err.msg];
    }
  });

  return next(
    new AppError(
      `Error from validator: ${JSON.stringify(extractedError).replace(
        /"/g,
        ''
      )}`,
      400
    )
  );
};

export default function validate(validation) {
  return [validation(), validateHandler];
}
