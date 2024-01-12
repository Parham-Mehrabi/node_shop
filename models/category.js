const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 128,
    },
    description: {
        type:String,
        maxLength: 1024
    }
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
