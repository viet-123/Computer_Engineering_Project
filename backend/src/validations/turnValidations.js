import Person from '../models/personModel.js';
import {
  checkOptionalArray,
  checkOptionalId,
  checkOptionalBoolean,
  checkArray,
  checkDate,
  checkOptionalDate,
} from './validationFactory.js';

export const validateCreatingTurn = () => [
  checkOptionalId('person', Person),
  checkDate('time'),
  checkOptionalBoolean('isMasked'),
  checkArray('images'),
];

export const validateUpdatingTurn = () => [
  checkOptionalId('person', Person),
  checkOptionalDate('time'),
  checkOptionalBoolean('isMasked'),
  checkOptionalArray('images'),
];
