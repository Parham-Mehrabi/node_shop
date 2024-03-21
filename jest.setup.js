import config from 'config';
import logger from "./startup/logger.js"
import db from "./startup/db.js"
import fakeCategory from './faker/create_category.js';
import fakeProduct from './faker/create_products.js';
import fakeUser from './faker/create_user.js';
import User from "./models/users.js";
import Category from "./models/category.js";
import Product from "./models/products.js";


export default async () => {
    console.log('start testing')
    logger()
    if (process.env.NODE_ENV == 'test'){
        User.deleteMany({});
        Category.deleteMany({});
        Product.deleteMany({});
    }
    await db()
    await fakeUser(5);
    await fakeCategory(5);
    await fakeProduct(5);
    console.log('test environment is ready')

    }
