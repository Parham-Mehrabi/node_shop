const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    }
    // TODO: complete category Schema and model
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
