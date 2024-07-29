const express = require('express');
const Article = require('../models/article.model.js');
const router = express.Router();
const { createArticle, getArticles, getArticle, getArticlesByDate, getArticlesByTag, deleteArticle, updateArticle } = require('../controller/article.controller.js');

router.post('/', createArticle);

router.get('/', getArticles);

router.get('/:id', getArticle);

router.get('/filter/date/:publishedDate', getArticlesByDate);

router.get('/filter/tag/:tag', getArticlesByTag);

router.put('/:id', updateArticle);

router.delete('/:id', deleteArticle);

module.exports = router;