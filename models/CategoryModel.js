const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    movies:{
        type: Array
    }
});


module.exports = mongoose.model('CategoryModel',CategorySchema)