const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { limiter } = require('./middlewares/limiter');
const BadRequestError = require('./errors/BadRequestError');
const errorsAll = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');

const routes = require('./routes/index');
const config = require('./config');

require('dotenv').config();

process.env.KEY = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : config.devKey;
process.env.DB = process.env.NODE_ENV === 'production' ? process.env.DB_URL : config.db;

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());

app.use(limiter);

app.use(cookieParser());

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логгер запросов

app.use('/', routes.userAuthRoute);

app.use(auth);

app.use('/', routes.usersRoute);
app.use('/', routes.atriclesRoute);

app.use('*', (res, req, next) => {
  next(new BadRequestError('Запрашиваемый ресурс не найден')); // неправильная маршрутизация
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // ошибки с celebrate

app.use(errorsAll); // ошибки централизация

app.listen(PORT);
