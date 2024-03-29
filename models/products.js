import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean,
        default: false,    
    }
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

export default Product;

