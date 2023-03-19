import Person from '../models/personModel.js';
import Building from '../models/buildingModel.js';
import {
  checkId,
  checkOptionalArray,
  checkOptionalId,
  checkOptionalBoolean,
  checkArray,
  checkDate,
  checkOptionalDate,
} from './validationFactory.js';

export const validateCreatingTurn = () => [
  checkOptionalId('person', Person),
  checkId('building', Building),
  checkDate('time'),
  checkOptionalBoolean('isMasked'),
  checkArray('images'),
];

export const validateUpdatingTurn = () => [
  checkOptionalId('person', Person),
  checkOptionalId('building', Building),
  checkOptionalDate('time'),
  checkOptionalBoolean('isMasked'),
  checkOptionalArray('images'),
];
