import {
  checkString,
  checkOptionalString,
  checkOptionalEnum,
  checkOptionalArray,
} from './validationFactory.js';

export const validateCreatingPerson = () => [
  checkString('firstName', 1),
  checkString('lastName', 1),
  checkOptionalEnum('status', ['active', 'inactive']),
  checkOptionalArray('images'),
];

export const validateUpdatingPerson = () => [
  checkOptionalString('firstName', 1),
  checkOptionalString('lastName', 1),
  checkOptionalEnum('status', ['active', 'inactive']),
  checkOptionalArray('images'),
];
