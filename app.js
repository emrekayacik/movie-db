const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const port = 3000;
require('dotenv/config');


const movieRoute = require('./routes/movies/movies');

app.use('/movies',movieRoute);
app.get('/', (req,res) => {
    res.send('HomePage')
});
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser : true},
    () => {
        console.log('connected to db');
});

app.listen(port);