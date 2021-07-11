const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('Book', bookSchema);