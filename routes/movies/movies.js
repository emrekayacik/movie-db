const { response, Router } = require('express');
const express = require('express');
const MovieModel = require('../../models/MovieModel');
const router = express.Router();
const Movie = require('../../models/MovieModel')

// GET ALL MOVIES
router.get('/', async (req,res) => {
    try{
        const movies = await Movie.find();
        res.json(movies);
    }catch(err){
        res.json({message: err})
    }
});

// ADD A MOVIE
router.post('/', async (req,res) => {
    const movieObj = req.body;
    const movie = new MovieModel({
        title: movieObj.title,
        description: movieObj.description,
        rating: movieObj.rating
    });
    try{
        const savedPost = await movie.save();
        res.json(savedPost); // see returned data from promise in the screen
    }catch(err){
        res.json({message: err});
    }
});

// GET A SPESIFIC POST
router.get('/:movieId', (req,res) => { // /:5 ---> movies/5
    Movie.findById(req.params.movieId)
        .then(movie => { // PROMISE, we can use either async-await
            res.json(movie);
        })
        .catch(err => {
            res.json({message: err})
        });
});

// DELETE A SPESIFIC POST
router.delete('/:movieId', async (req,res) => {
    try{
        const movieToDelete = await Movie.remove({_id: req.params.movieId})
        res.json(`Successfully deleted: ${movieToDelete.title}`);
    }catch(err){
        res.json({message: err})
    }
});

// UPDATE A SPESIFIC POST
router.patch('/:movieId', (req,res) => {
    Movie.findByIdAndUpdate(
                            {_id: req.params.movieId},
                            // setting up new object, for the given id
                            { $set: {title: req.body.title,description: req.body.description}}
                    )
                .then(movie => {
                    res.json(`Old movie: ${movie} New movie description: ${req.body.description}`)
                })
                .catch(err => res.json({message: err}))
});

module.exports = router;