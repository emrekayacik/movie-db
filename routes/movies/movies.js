const express = require('express');
const router = express.Router();
const MovieModel = require('../../models/MovieModel');


// GET ALL MOVIES
router.get('/', (req,res) => {
    MovieModel.find()
    .then(movie=>res.json(movie))
    .catch(err=>res.json({message:err}));
});

// ADD A MOVIE
router.post('/', async (req,res) => {
    const movie = new MovieModel({
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating
    });
    movie.save()
    .then(movie=>res.json(movie))
    .catch(err=>res.json({message:err}));
});

// GET A SPESIFIC MOVIE
router.get('/:movieId', (req,res) => { // /:5 ---> movies/5
    MovieModel.findById(req.params.movieId)
        .then(movie => { // PROMISE, we can use either async-await or promise
            res.json(movie);
        })
        .catch(err => {
            res.json({message: err})
        });
});

// DELETE A SPESIFIC MOVIE
router.delete('/:movieId', async (req,res) => {
    MovieModel.findByIdAndRemove(req.params.movieId)
    .then(movie=>res.json(`Successfully deleted: ${movie.title}`))
    .catch(err=>res.json({message:err}))
});

// UPDATE A SPESIFIC MOVIE
router.patch('/:movieId', (req,res) => {
    MovieModel.findByIdAndUpdate(
                            {_id: req.params.movieId},
                            // setting up new object, for the given id
                            { $set: {title: req.body.title,description: req.body.description,rating:req.body.rating}}
                    )
                .then(movie => {
                    res.json(`Old movie: ${movie} New movie description: ${req.body.description}`)
                })
                .catch(err => res.json({message: err}))
});

module.exports = router;