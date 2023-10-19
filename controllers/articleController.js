// backend/controllers/articleController.js

const Article = require('../models/Article');

// Create a new article
const createArticle = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const article = new Article({ title, content, author });
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: 'Error creating the article' });
  }
};

// Get all articles
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving articles' });
  }
};
const getArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const articles = await Article.findById(articleId);
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving articles' });
  }
};


// Update an article by ID
const updateArticle = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const articleId = req.params.id;
    const updatedArticle = await Article.findByIdAndUpdate(articleId, { title, content, author }, { new: true });
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: 'Error updating the article' });
  }
};

// Delete an article by ID
const deleteArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    await Article.findByIdAndRemove(articleId);
    res.status(200).json({message:'Article deleted successfully'}).end();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the article' });
  }
};

module.exports = {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
};
