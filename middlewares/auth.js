const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { ERRORS } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(ERRORS.NEED_TO_LOGIN));
  }

  const token = authorization.replace('Bearer ', '');

  try {
    req.user = jwt.verify(token, process.env.KEY);
  } catch (err) {
    return next(new UnauthorizedError(ERRORS.NEED_TO_LOGIN));
  }

  return next(); // пропускаем запрос дальше
};
