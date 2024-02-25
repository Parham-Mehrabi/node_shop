import mongoose from 'mongoose';

describe('DataBase', () => {
    afterAll(async () => {
        await mongoose.connection.close()
    })
    it('should connect to db', async () => {
        await require('../../startup/logger.js')()
        await require('../../startup/db')()
        const state = mongoose.connection.readyState
        expect(state).toBe(1)

    });
})
