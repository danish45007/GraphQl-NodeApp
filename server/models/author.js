const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authors = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    age: { 
        type: Number,
        required: true
    }

},{timestamps:true})

module.exports = mongoose.model("Authors",authors);