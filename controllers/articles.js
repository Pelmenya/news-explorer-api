const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const FobidenError = require('../errors/ForbiddenError');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .select('+owner')
    .then((articles) => {
      if (articles.length !== 0) {
        const data = articles.filter((item) => String(item.owner) === req.user._id);
        res.send({ myArticles: data });
      } else throw new NotFoundError('Ресурсы не созданы на сервере =)');
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
        throw new NotFoundError(`Статьи с id : ${req.params.cardId} не существует!`);
      } else if (req.user._id === String(article.owner)) {
        Article.findByIdAndRemove(req.params.articleId)
          .then((articleRemove) => {
            if (articleRemove) {
              res.send({ remove: articleRemove });
            } else throw new NotFoundError(`Статья с id : ${req.params.articleId} уже была удалена Вами или с Вашего аккаунта!`);
          })
          .catch(next);
      } else throw new FobidenError('Недостаточно прав доступа к ресурсу');
    })
    .catch(next);
};
