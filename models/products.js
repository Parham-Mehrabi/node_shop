const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    // FIXME complete this part
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    },
    description: String,
    price: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    reviews: [reviewSchema],
})



const Product = mongoose.model('Product', productSchema)

module.exports = Product;

