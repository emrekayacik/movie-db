// fundamentals
const express = require('express');
const app = express();
const port = 3000;

// package imports
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const cors = require('cors'); // for CORS-POLICY

// routes
const movieRoute = require('./routes/movies/movies');
const categoryRoute = require('./routes/categories/categories');

// using body-parser for the requests
app.use(bodyParser.json());
app.use(cors()); // for CORS-POLICY
//use routes
app.use('/movies',movieRoute);
app.use('/categories',categoryRoute);

app.get('/', (req,res) => {
    res.send('HomePage')
});

mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser : true},
    () => {
        console.log('connected to db');
});

app.listen(port);