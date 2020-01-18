// user
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { ERRORS } = require('../config');


const userSchema = new mongoose.Schema({
  name: {
    // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: ERRORS.INCORRECT_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // минимальная длина пароля — 6 символов
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function authenticationUser(email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      return Promise.reject(new UnauthorizedError(ERRORS.INCORRECT_EMAIL_OR_PASSWORD));
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new UnauthorizedError(ERRORS.INCORRECT_EMAIL_OR_PASSWORD));
      }
      return user; // теперь user доступен
    });
  });
};

module.exports = mongoose.model('user', userSchema);
