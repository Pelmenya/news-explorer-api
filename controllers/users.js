const User = require('../models/user.js');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getUser = (req, res, next) => {
  User.findById(String(req.user._id))
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError(`Пользователя с id : ${req.params.userId} не существует!`);
      }
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (users.length !== 0) {
        res.send({ data: users });
      } else throw new NotFoundError('Ресурсы не созданы на сервере =)');
    })
    .catch(next);
};
