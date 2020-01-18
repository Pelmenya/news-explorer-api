const routes = require('express').Router();
const BadRequestError = require('../errors/BadRequestError');
const auth = require('../middlewares/auth');
const { ERRORS } = require('../config');

const atriclesRoute = require('./articles');
const userAuthRoute = require('./userAuth');
const usersRoute = require('./users');

// подключаем все роутеры в один
routes.use('/', userAuthRoute, auth, usersRoute, atriclesRoute);

routes.use('*', (res, req, next) => {
  next(new BadRequestError(ERRORS.BAD_RESOURCE)); // неправильная маршрутизация
});

module.exports = routes;
