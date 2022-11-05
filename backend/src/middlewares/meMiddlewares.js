import cleanObject from '../utils/cleanObject.js';

export const getCurrentId = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

export const cleanUpdatedInfoObject = cleanObject('name');
