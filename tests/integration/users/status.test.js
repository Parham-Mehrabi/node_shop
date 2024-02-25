import mongoose from 'mongoose.js';
import request from 'supertest.js';


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
