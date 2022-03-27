const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    res.send('Movies Page');
});

router.get('/1', (req,res) => {
    res.send('Movie No:1');
});

module.exports = router;