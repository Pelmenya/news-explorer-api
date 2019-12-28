const router = require('express').Router();
const { validateCreateArticle, validateDeleteArticle } = require('../validate');

const { getArticles, createArticle, deleteArticleById } = require('../controllers/articles');

router.get('/articles', getArticles);

router.post('/articles', validateCreateArticle, createArticle);

router.delete('/articles/:articleId', validateDeleteArticle, deleteArticleById);

module.exports = router;
