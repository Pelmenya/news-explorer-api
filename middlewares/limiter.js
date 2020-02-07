const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // за 5 минут
  max: 1000, // можно совершить максимум 1000 запросов с одного IP
});
