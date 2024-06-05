// create web server
const express = require('express');
const app = express();
const port = 3000;

// create comments array
const comments = [
    {name: 'John', comment: 'Hello World!'},
    {name: 'Mary', comment: 'Hi there!'},
    {name: 'Steve', comment: 'Howdy!'}
];

// set view engine
app.set('view engine', 'pug');

// set route
app.get('/', (req, res) => {
    res.render('index', {comments: comments});
});

// start server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
