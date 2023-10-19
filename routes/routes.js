// backend/routes/routes.js

const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const userController = require('../controllers/userController');

// Routes for articles
router.post('/articles', userController.authenticateUser, articleController.createArticle);
router.get('/articles', articleController.getArticles);
router.get('/articles', articleController.getArticle);
router.put('/articles/:id', articleController.updateArticle);
router.delete('/articles/:id',userController.checkAdmin, articleController.deleteArticle);

// Routes for user registration and login
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;
