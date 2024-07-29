const Article = require('../models/article.model.js')
const mongoose = require('mongoose')

// create article
const createArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body);

        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// get all articles
const getArticles = async (req, res) => {
    try {
        const articles = await Article.find({});

        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// get a specific article by id
const getArticle = async (req, res) => {
    try {
        const { id } = req.params;

        const article = await Article.findById(id);

        if (!article) {
            return res.status(404).json({message: 'Article not found'});
        }

        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// filter by published date
const getArticlesByDate = async (req, res) => {
    try {
        const { publishedDate } = req.params;

        // Debugging output to verify received parameters
        console.log(`Filtering articles with exact published date: ${publishedDate}`);

        // Parse the publishedDate parameter to a Date object
        const date = new Date(publishedDate);

        if (isNaN(date)) {
            return res.status(400).json({ message: 'Invalid date format. Please use YYYY-MM-DD.' });
        }

        // Set start and end of the day
        const startDate = new Date(date.setHours(0, 0, 0, 0));
        const endDate = new Date(date.setHours(23, 59, 59, 999));

        // Find articles published on the exact date
        const articles = await Article.find({
            publishedDate: {
                $gte: startDate,
                $lt: endDate
            }
        });

        // Debugging output to verify query results
        console.log(`Found ${articles.length} articles for exact date: ${publishedDate}`);

        res.status(200).json(articles);
    } catch (error) {
        console.error(`Error finding articles by exact date: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

// Filter articles by tag
const getArticlesByTag = async (req, res) => {
    try {
        const { tag } = req.params;

        const articles = await Article.find({ tag: { $in: [tag] } });
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// delete an article
const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;

        const article = await Article.findByIdAndDelete(id);

        if (!article) {
            return res.status(404).json({message: 'Article not found'});
        }

        res.status(200).json({message: 'Article deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// update an article
const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;

        const article = await Article.findByIdAndUpdate(id, req.body);

        if (!article) {
            return res.status(404).json({message: 'Article not found'});
        }

        const updatedArticle = await Article.findById(id);

        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports = {
    createArticle,
    getArticles,
    getArticle,
    getArticlesByDate,
    getArticlesByTag,
    deleteArticle,
    updateArticle
}