const jwt = require('jsonwebtoken');
const { JWT } = require('../utils/constants');
const UnauthorizedError = require('../errors/unauthorized-err');

const auth = (req, res, next) => {
  const { token } = req.cookies;
  let payload;
  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  try {
    payload = jwt.verify(token, JWT);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
