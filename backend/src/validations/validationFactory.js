import lodash from 'lodash';
import { check } from 'express-validator';

export const checkString = (field, minLength) =>
  check(field)
    .exists()
    .withMessage(`${lodash.startCase(field)} is required.`)
    .bail()
    .isLength({ min: minLength })
    .withMessage(
      `${lodash.startCase(field)} must be at least ${minLength} chars long.`
    );

export const checkUniqueString = (field, minLength, Model) =>
  checkString(field, minLength)
    .bail()
    .custom((value) =>
      Model.exists({ [field]: value }).then((doc) =>
        doc ? Promise.reject() : Promise.resolve()
      )
    )
    .withMessage(`${lodash.startCase(field)} already in use.`);

export const checkOptionalString = (field, minLength) =>
  check(field)
    .optional()
    .isLength({ min: minLength })
    .withMessage(
      `${lodash.startCase(field)} must be at least ${minLength} chars long.`
    );

export const checkDate = (field) =>
  check(field)
    .exists()
    .withMessage(`${lodash.startCase(field)} is required.`)
    .bail()
    .isISO8601()
    .toDate()
    .withMessage(`${lodash.startCase(field)} is invalid.`);

export const checkOptionalDate = (field) =>
  check(field)
    .optional()
    .isISO8601()
    .toDate()
    .withMessage(`${lodash.startCase(field)} is invalid.`);

export const checkEnum = (field, array) =>
  check(field)
    .exists()
    .withMessage(`${lodash.startCase(field)} is required.`)
    .bail()
    .custom((value) => array.includes(value))
    .withMessage(`${lodash.startCase(field)} is invalid.`);

export const checkOptionalEnum = (field, array) =>
  check(field)
    .optional()
    .custom((value) => array.includes(value))
    .withMessage(`${lodash.startCase(field)} is invalid.`);

export const checkId = (field, Model) =>
  check(field)
    .exists()
    .withMessage(`${lodash.startCase(field)} Id is required.`)
    .bail()
    .isMongoId()
    .withMessage(`${lodash.startCase(field)} Id is invalid.`)
    .bail()
    .custom((value) =>
      Model.findById(value).then((doc) =>
        doc ? Promise.resolve() : Promise.reject()
      )
    )
    .withMessage(`No ${lodash.startCase(field)} found with this ID`);

export const checkOptionalId = (field, Model) =>
  check(field)
    .optional()
    .isMongoId()
    .withMessage(`${lodash.startCase(field)} Id is invalid.`)
    .bail()
    .custom((value) =>
      Model.findById(value).then((doc) =>
        doc ? Promise.resolve() : Promise.reject()
      )
    )
    .withMessage(`No ${lodash.startCase(field)} found with this ID`);

export const checkInt = (field) =>
  check(field)
    .exists()
    .withMessage(`${lodash.startCase(field)} is required.`)
    .bail()
    .isInt({ min: 0 })
    .withMessage(`${lodash.startCase(field)} must be a integer.`);

export const checkOptionalInt = (field) =>
  check(field)
    .optional()
    .isInt({ min: 0 })
    .withMessage(`${lodash.startCase(field)} must be a integer.`);

export const checkURL = (field) =>
  check(field)
    .exists()
    .withMessage(`${lodash.startCase(field)} is required.`)
    .bail()
    .isURL()
    .withMessage(`${lodash.startCase(field)} must be an URL.`);

export const checkOptionalURL = (field) =>
  check(field)
    .optional()
    .isURL()
    .withMessage(`${lodash.startCase(field)} must be an URL.`);

export const checkArray = (field) =>
  check(field)
    .exists()
    .withMessage(`${lodash.startCase(field)} is required.`)
    .bail()
    .isArray()
    .withMessage(`${lodash.startCase(field)} must be an array.`);

export const checkOptionalArray = (field) =>
  check(field)
    .optional()
    .isArray()
    .withMessage(`${lodash.startCase(field)} must be an array.`);

export const checkBoolean = (field) =>
  check(field)
    .exists()
    .withMessage(`${lodash.startCase(field)} is required.`)
    .bail()
    .isBoolean()
    .withMessage(`${lodash.startCase(field)} must be a boolean.`);

export const checkOptionalBoolean = (field) =>
  check(field)
    .optional()
    .isBoolean()
    .withMessage(`${lodash.startCase(field)} must be a boolean.`);
