const config = require('config')
const mongoose = require('mongoose');
const chance = require('chance');
const Product = require('../models/products');
const get_random_user = require('../utils/get_random_user')

const Faker = new chance;
const db_url = config.get('db');

async function createProductsReviews() {
    try {
        const products = await Product.find({})
        if (products.length == 0) console.log('No Product Found. fake some products before faking reviews')
        await Promise.all(products.map(async product => {
            let reviews_count = Math.floor(Math.random() * 6)
            for (reviews_count; reviews_count >= 0; --reviews_count) {
                user = await get_random_user()
                const review = {
                    author: user,
                    content: Faker.paragraph()
                }
                product.reviews.push(review)
                if (process.NODE_ENV != 'test') {console.log(review)}
            }
            await product.save()
        }))
    }
    catch (e) {
        console.log(e)
    }
    finally {
        await mongoose.disconnect()
        if (process.env.NODE_ENV != 'test') {
            console.log('disconnected from DB')
        }
    }
}

if (process.env.NODE_ENV != 'test') {
    mongoose.connect(db_url).then(() => {
        console.log('connected to ' + db_url)
        createProductsReviews()
    })

}


module.exports = createProductsReviews;
