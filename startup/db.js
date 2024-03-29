import mongoose from 'mongoose';
import config from 'config';
import winston from 'winston';

export default async function () {
    const db = config.get('db')
    await mongoose.connect(db)
    winston.info('Db Connected at ' + db)
}
