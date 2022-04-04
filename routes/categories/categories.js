const express = require('express');
const router = express.Router();

const CategoryModel = require('../../models/CategoryModel');

router.get('/',(req,res)=>{
    CategoryModel.find()
    .then(category=>res.json(category))
    .catch(err=>res.json({message:err}));
});

router.get('/:categoryId',(req,res)=>{
    CategoryModel.findById(req.params.categoryId)
    .then(category=>res.json(category))
    .catch(err=>res.json({message:err}));
});

router.post('/',(req,res)=>{
    const category = new CategoryModel({
        name: req.body.name,
        description: req.body.description,
        movies: req.body.movies
    });
    category.save()
    .then(savedCategory=>res.json(savedCategory))
    .catch(err=>res.json({message: err}));
});

router.delete('/:categoryId',(req,res)=>{
    CategoryModel.findByIdAndRemove(req.params.categoryId)
    .then(deletedCategory=>res.json(`Successfully deleted: ${deletedCategory}`))
    .catch(err=>res.json({message:err}))
});

router.patch('/:categoryId',(req,res)=>{
    CategoryModel.findByIdAndUpdate(
                            {_id: req.params.categoryId},
                            { $set: {name: req.body.name,description: req.body.description,movies:req.body.movies}}
                    )
                .then(category => {
                    res.json(`Old category: ${category} New category: ${req.body.name} - ${req.body.description} - ${req.body.movies}`)
                })
                .catch(err => res.json({message: err}))
});
module.exports = router;