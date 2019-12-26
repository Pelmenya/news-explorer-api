const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { hexRegEx, urlRegEx } = require('../consts');

const { getArticles, createArticle, deleteArticleById } = require('../controllers/articles');

router.get('/articles', getArticles);

router.post(
  '/articles',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.date().required(),
      source: Joi.string().required(),
      link: Joi.string().pattern(urlRegEx).required(),
      image: Joi.string().pattern(urlRegEx).required(),
    }),
  }),
  createArticle,
);

router.delete(
  '/articles/:articleId',
  celebrate({
    // валидируем параметры
    params: Joi.object().keys({
      articleId: Joi.string().pattern(hexRegEx),
    }),
  }),
  deleteArticleById,
);

module.exports = router;
