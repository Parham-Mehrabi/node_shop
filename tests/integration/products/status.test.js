import request from 'supertest'
import Server from '../../../index.js'
import get_random_product from '../../../utils/get_random_product.js'
import Product from '../../../models/products.js';
import get_random_category from '../../../utils/get_random_category.js';


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
            const product = await get_random_product()
            const result = await request(server).get('/api/v1/products/' + product._id.toString());
            expect(result.status).toBe(200);
        })

        it('POST / should return 201 for valid data', async () => {
            const valid_product = new Product()
            // const valid_product = {
            // }
            valid_product.name = "valid_product_status"
            valid_product.category = (await get_random_category())._id
            valid_product.price = 201000
            valid_product.quantity = 201
            const result = await request(server).post('/api/v1/products/')
            .send(valid_product.toJSON());
            expect(result.status).toBe(201);
        })
        
        it('POST / should return 400 for Invalid data', async () => {
            const result = await request(server).post('/api/v1/products/')
            .send();
            expect(result.status).toBe(400);
        })
    })

    describe('/api/v1/products/category', () => {
        it('Should return 200 for /', async () => {
            const result = await request(server).get('/api/v1/products/category');
            expect(result.status).toBe(200);
        })
    })
})
