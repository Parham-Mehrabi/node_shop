import request from 'supertest'
import Server from '../../../index.js'
import get_random_user from '../../../utils/get_random_user.js'
import create_random_user from '../../../faker/create_user.js'


describe('test products end-points response codes', () => {
    let server;
    beforeAll(async () => {
        server = await Server()
    })
    afterAll(async () => {
        await server.close()
    })
    
    describe('/api/v1/products/', () => {
        it('GET / should return 200', async () => {
            const result = await request(server).get('/api/v1/products/');
            expect(result.status).toBe(200);
        })

        it('GET /:id should return 200', async () => {
            const user = await get_random_user()
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
