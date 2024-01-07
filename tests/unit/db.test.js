const mongoose = require('mongoose');

describe('DataBase', () => {
    afterAll(async () => {
        await mongoose.connection.close()
    })
    it('should connect to db', async () => {
        await require('../../startup/db')()
        const state = mongoose.connection.readyState
        expect(state).toBe(1)

    });
})