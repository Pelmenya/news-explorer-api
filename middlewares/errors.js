const { ERRORS } = require('../config');

module.exports = (err, req, res, next) => {
  const { statusCode, message } = err;
  if (!statusCode) {
    if (message.indexOf('E11000 duplicate key error collection') === 0) {
      res.status(400).send(ERRORS.DUPLICATE_KEY);
      next();
    } else {
      res.status(500).send({ message }); // лучше оставить message, т.к. видно, что не так
      next();
    }
  } else if (message.indexOf('Cast to ObjectId failed') === 0) {
    res.status(404).send(ERRORS.INVALID_ID);
    next();
  } else {
    res.status(statusCode).send({ message });
    next();
  }
};
