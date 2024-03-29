import mongoose from 'mongoose';
import chance from 'chance';
import Category from '../models/category.js';
import config from 'config';

const Faker = new chance
const COUNT = parseInt(process.argv[2]) || 10


const db_url = config.get('db')

export default async function createCategory(count) {
    try {
        const my_promises = []
        await mongoose.connect(db_url);
        for (count; count > 0; --count) {
            const CategoryObject = new Category;
            CategoryObject.name = Faker.name();
            CategoryObject.description = Faker.paragraph();
            my_promises.push(CategoryObject.save());
        };
        const fake_category = await Promise.all(my_promises);

        if (process.env.NODE_ENV != 'test') {
            fake_category.map(category => console.log(`CREATE ${category.name}`))
        }
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
    createCategory(COUNT)
}
