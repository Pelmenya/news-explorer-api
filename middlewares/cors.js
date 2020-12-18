const cors = require('cors');

// Массив разешённых доменов
const allowedCors = [
  'https://396697-pelmenya.tmweb.ru',
  'http://396697-pelmenya.tmweb.ru',
  'https://www.396697-pelmenya.tmweb.ru',
  'http://www.396697-pelmenya.tmweb.ru',
  'https://pelmenya.github.io',
  'http://pelmenya.github.io',
  'http://localhost:8080',
];

module.exports = cors({
  origin: allowedCors,
});
