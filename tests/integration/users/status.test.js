const mongoose = require('mongoose')
const request = require('supertest');


describe('test products end-points response codes /api/v1/users', () => {
    let server;
    beforeAll(async () => {
        server = await require('../../../index');
    })
    afterAll(async () => {
        await mongoose.connection.close();
    })
    afterEach(async () => {
        await server.close()
    })
    it('GET / should return 200', async () => {
        const result = await request(server).get('/api/v1/users/');
        expect(result.status).toBe(200);
    })
})
q