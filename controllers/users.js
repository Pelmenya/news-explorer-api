const User = require('../models/user.js');
const NotFoundError = require('../errors/NotFoundError');

const { ERRORS } = require('../config');

module.exports.getUser = (req, res, next) => {
  User.findById(String(req.user._id))
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError(ERRORS.NOT_EXIST_USER);
      }
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (users.length !== 0) {
        res.send({ data: users });
      } else throw new NotFoundError(ERRORS.NOT_CREATE_RESOURCE);
    })
    .catch(next);
};
