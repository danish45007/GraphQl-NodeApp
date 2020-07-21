const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const books = new Schema({
    name: {
        type: String,
        required: true,
        unique: true

    },
    genre: { 
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    }

},{timestamps:true})

module.exports = mongoose.model("Books",books);