const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }
})

// TODO: complete products Schema and model

const Product = mongoose.model('Product', productSchema)

module.exports = Product;

