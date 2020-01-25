const cors = require('cors');

// Массив разешённых доменов
const allowedCors = [
  'https://news-service.pro',
  'http://news-service.pro',
  'https://www.news-service.pro',
  'http://www.news-service.pro',
  'https://pelmenya.github.io',
  'http://pelmenya.github.io',
  'http://localhost:8080',
];

module.exports = cors({
  origin: allowedCors,
});
