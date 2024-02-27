import mongoose from 'mongoose';
import db from '../../startup/db';
import logger from '../../startup/logger.js';

describe('DataBase', () => {
    afterAll(async () => {
        await mongoose.connection.close()
    })
    it('should connect to db', async () => {
        await logger()
        await db()
        const state = mongoose.connection.readyState
        expect(state).toBe(1)

    });
})
