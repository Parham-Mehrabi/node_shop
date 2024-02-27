import request from 'supertest'
import mongoose from 'mongoose'
import Server from '../../../index.js'
import get_random_user from '../../../utils/get_random_user.js'


describe('test products end-points response codes', () => {
    let server;
    beforeEach(async () => {
        server = Server
    })
    afterAll(async () => {
        await mongoose.connection.close();
    })
    afterEach(async () =>{
        await server.close()
    })
    describe('/api/v1/products/', () => {
        beforeAll(() => {
            // TODO: create 2 products and 2 categories before tests
        })
        it('GET / should return 200', async () => {
            const result = await request(server).get('/api/v1/products/');
            expect(result.status).toBe(200);
        })

        it('GET /:id should return 200', async () => {
            user = await get_random_user()

            const result = await request(server).get('/api/v1/products/' + user._id);
            expect(result.status).toBe(200);
        })

        it('POST / should return 201 for valid data', async () => {
            const result = await request(server).post('/api/v1/products/');
            expect(result.status).toBe(201);
        })
        
        it('POST / should return 400 for Invalid data', async () => {
            const result = await request(server).post('/api/v1/products/');
            expect(result.status).toBe(200);
        })
    })

    describe('/api/v1/products/category', () => {
        it('Should return 200 for /', async () => {
            const result = await request(server).get('/api/v1/products/category');
            expect(result.status).toBe(200);
        })
    })
})
