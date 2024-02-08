const config = require('config')
const mongoose = require('mongoose');
const chance = require('chance');
const Category = require('../models/category');
const Product = require('../models/products');

const Faker = new chance;
const db_url = config.get('db');

async function createProducts(count) {
    const my_promises = []
    try {
        const categories = await Category.find({})
        for (let i = count; i > 0; i--) {
            let shuffled_categories = categories.sort(() => Math.random() - .5);
            const productObject = new Product;
            productObject.name = Faker.name().split(' ')[0];
            productObject.category = shuffled_categories[0]._id
            productObject.description = Faker.paragraph()
            productObject.price = Faker.integer({ min: 5, max: 10000 }) * 1000
            productObject.quantity = Faker.integer({min: 0, max:30})
            my_promises.push(productObject.save())
        }
        const fake_products = await Promise.all(my_promises);
        if (process.env.NODE_ENV != 'test') {
            fake_products.map(product => console.log(`CREATE ${product.name}`))
        } 
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
    const COUNT = parseInt(process.argv[2]) || 10
    mongoose.connect(db_url).then(() => {
        console.log('connected to ' + db_url)
        createProducts(COUNT)
    })

}

module.exports = createProducts;
