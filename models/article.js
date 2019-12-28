const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  }, // — ключевое слово, по которому статью нашли. Обязательное поле-строка.
  title: {
    type: String,
    required: true,
  }, // — заголовок статьи. Обязательное поле-строка.
  text: {
    type: String,
    required: true,
  }, // — текст статьи. Обязательное поле-строка.
  date: {
    type: Date,
    required: true,
    // default: Date.now,
  }, // — дата статьи. Обязательное поле-строка.
  source: {
    type: String,
    required: true,
  }, // — источник статьи. Обязательное поле-строка.
  link: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: 'Неправильный формат URL',
    },
  }, // — ссылка на статью. Обязательное поле-строка. Должно быть URL-адресом.
  image: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: 'Неправильный формат URL',
    },
  }, //  — ссылка на иллюстрацию к статье. Обязательное поле-строка. Должно быть URL-адресом.
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
  },
  // — _id пользователя, сохранившего статью. Нужно задать поведение по умолчанию,
});

module.exports = mongoose.model('article', articleSchema);
