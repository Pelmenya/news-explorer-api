const { Joi, celebrate } = require('celebrate');
const { hexRegEx, urlRegEx } = require('./consts');

module.exports.validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});
module.exports.validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

module.exports.validateCreateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.date().required(),
    source: Joi.string().required(),
    link: Joi.string().pattern(urlRegEx).required(),
    image: Joi.string().pattern(urlRegEx).required(),
  }),
});

module.exports.validateDeleteArticle = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().pattern(hexRegEx),
  }),
});
