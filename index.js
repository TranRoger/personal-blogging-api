const mongoose = require('mongoose');
const express = require('express');
const app = express();
const articleRoute = require('./routes/article.route.js');


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/articles', articleRoute);

// database connection
mongoose.connect('mongodb+srv://roger:162534Hh@cluster0.i1x9458.mongodb.net/Article?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Database connected successfully');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch(() => {
    console.log('Connection failed');
});
