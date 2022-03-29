const mongoose = require('mongoose');


const MovieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    rating: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MovieModel',MovieSchema);