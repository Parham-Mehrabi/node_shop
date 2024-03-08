import mongoose from 'mongoose';
import chance from 'chance';
import config from 'config';
import Product from '../models/products.js';
import get_random_user from '../utils/get_random_user.js'


const Faker = new chance;
const db_url = config.get('db');

export default async function createProductsReviews() {
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
        if (process.env.NODE_ENV != 'test') {
            await mongoose.disconnect()
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
