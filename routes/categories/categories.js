const express = require('express');
const router = express.Router();
const verify = require('../auth/verifyToken');
const User = require('../../models/UserModel');

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

router.post('/',verify,async (req,res)=>{
    const category = new CategoryModel({
        name: req.body.name,
        description: req.body.description,
        movies: req.body.movies
    });
    const currentUser = await User.findById(req.user._id);
    
    category.save()
    .then(savedCategory=>res.json({"SavedCategory": savedCategory,
                                   "SavingUser": currentUser}))
    .catch(err=>res.json({message: err}));
});

router.delete('/:categoryId',verify,async (req,res)=>{
    const currentUser = await User.findById(req.user._id);
    CategoryModel.findByIdAndRemove(req.params.categoryId)
    .then(deletedCategory=>res.json({"DeletedCategory": deletedCategory,
                                      "DeletingUser": currentUser}))
    .catch(err=>res.json({message:err}))
});

router.patch('/:categoryId',verify,(req,res)=>{
    CategoryModel.findByIdAndUpdate(
                            {_id: req.params.categoryId},
                            { $set: {name: req.body.name,description: req.body.description,movies:req.body.movies}}
                    )
                .then(category => {
                    res.json({"NewCategory": req.body,"PatchingUser":req.user})
                })
                .catch(err => res.json({message: err}))
});
module.exports = router;