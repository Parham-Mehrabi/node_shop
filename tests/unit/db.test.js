import mongoose from 'mongoose';
import db from '../../startup/db';
import logger from '../../startup/logger.js';

describe('DataBase', () => {

    it('should connect to db', async () => {
        logger()
        await db()
        const state = mongoose.connection.readyState
        expect(state).toBe(1)

    });
})
