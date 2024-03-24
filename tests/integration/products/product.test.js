import request from 'supertest'
import Chance from 'chance'
import Server from '../../../index.js'
import db from '../../../startup/db.js'
import logger from '../../../startup/logger.js'
import Product from '../../../models/products.js'
import get_random_category from '../../../utils/get_random_category.js'

describe("/api/v1/products/", () => {
    let Faker = new Chance
    let server;
    let endPoint = '/api/v1/products/'

    beforeAll(async () => {
        server = await Server()
        logger()
        await db()
    })
    afterAll(async () => {
        await server.close()
    })

    describe("Post /", () => {
        it("should create a new product with valid data", async () => {
            const new_product = new Product()
            new_product.name = Faker.name();
            new_product.category = await get_random_category();
            new_product.description = Faker.paragraph()
            new_product.price = Faker.integer({ min: 5, max: 10000 }) * 1000
            new_product.quantity = Faker.integer({ min: 0, max: 30 })
            new_product.reviews = []

            const result = await request(server)
                .post(endPoint)
                .send(new_product.toJSON())

            const fetched_product = await Product.findOne(new_product)

            expect(fetched_product.toJSON()).toMatchObject(new_product.toJSON());
            expect(result.status).toBe(201)

        })
    })

    describe("GET /", () => {
        it("should list the products", async () => {
            const result = await request(server).get(endPoint);
            expect(result._body.length).toBeGreaterThanOrEqual(5);
        })
    })
})
