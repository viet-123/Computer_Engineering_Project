import jwt from 'jsonwebtoken';
import lodash from 'lodash';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: lodash.omit(user.toJSON(), 'password'),
    },
  });
};

export default createSendToken;
