const corsControl = require('express').Router();

// Массив разешённых доменов
const allowedCors = [
  'https://news-service.pro',
  'http://news-service.pro',
  'https://www.news-service.pro',
  'http://www.news-service.pro',
  'http://localhost:8080',
];

corsControl.use((req, res, next) => {
  const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок

  if (allowedCors.includes(origin)) {
    // Проверяем, что значение origin есть среди разрешённых доменов
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization',
  );
  next();
});

module.exports = corsControl;
