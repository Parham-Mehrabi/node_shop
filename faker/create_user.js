import mongoose from 'mongoose';
import chance from 'chance';
import config from 'config';
import User from '../models/users.js';

const Faker = new chance
const COUNT = parseInt(process.argv[2]) || 10


const db_url = config.get('db')

export default async function createUsers(count) {
    try {
        if (process.env.NODE_ENV != 'test') {
            await mongoose.connect(db_url);
        }
        
        const my_promises = []
        for (count; count > 0; --count) {
            const UserObject = new User;
            UserObject.email = Faker.email()
            UserObject.address = Faker.address()
            my_promises.push(UserObject.save())
        };
        const fake_students = await Promise.all(my_promises);

        if (process.env.NODE_ENV != 'test') {
            fake_students.map(student => console.log(`CREATE ${student.email}`))
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
    createUsers(COUNT)
}
