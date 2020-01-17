const devKey = 'dev-secret';
const db = 'mongodb://localhost:27017/newsdb';

// тексты ошибок

module.exports = { devKey, db };

module.exports.ERRORS = {
  BAD_RESOURCE: 'Запрашиваемый ресурс не найден',
  NOT_CREATE_RESOURCE: 'Ресурсы не созданы на сервере',
  NOT_ACCESS: 'Недостаточно прав доступа к ресурсу',
  NOT_EXIST_ARTICLE: 'Статьи не существует!',
  NOT_EXIST_USER: 'Пользователя не существует!',
  ARTICLE_HAS_BEEN_DELETED: 'Статья уже была удалена Вами или с Вашего аккаунта!',
  NEED_TO_LOGIN: 'Необходима авторизация',
  INVALID_ID: 'Некорректный id объекта запроса',
  INCORRECT_URL: 'Неправильный формат URL',
  INCORRECT_EMAIL: 'Неправильный формат e-mail',
  INCORRECT_EMAIL_OR_PASSWORD: 'Неправильные почта или пароль',
  DUPLICATE_KEY: 'Пользователь с таким email уже зарегистрирован',
};

module.exports.MESSAGES = {
  AUTH_OK: 'Аутентификация успешна !!!',
};
