const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        author: {
            type: String,
            required: true
        },

        publishedDate: {
            type: Date,
            required: false,
            default: Date.now
        },

        tag: {
            type: [String],
            required: false
        },
    },
    {
        timestamps: true,
    }
);

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;