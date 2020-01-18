const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const FobidenError = require('../errors/ForbiddenError');
const { ERRORS } = require('../config');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .select('+owner')
    .then((articles) => {
      const data = articles.filter((item) => String(item.owner) === req.user._id);
      if (data.length !== 0) {
        res.send({ myArticles: data });
      } else throw new NotFoundError(ERRORS.NOT_CREATE_RESOURCE);
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch(next);
};

module.exports.deleteArticleById = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError(ERRORS.NOT_EXIST_ARTICLE);
      } else if (req.user._id === String(article.owner)) {
        Article.findByIdAndRemove(req.params.articleId)
          .then((articleRemove) => {
            if (articleRemove) {
              res.send({ remove: articleRemove });
            } else throw new NotFoundError(ERRORS.ARTICLE_HAS_BEEN_DELETED);
          })
          .catch(next);
      } else throw new FobidenError(ERRORS.NOT_ACCESS);
    })
    .catch(next);
};
