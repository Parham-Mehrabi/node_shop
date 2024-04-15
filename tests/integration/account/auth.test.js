import request from 'supertest';
import Chance from 'chance';
import User from '../../../models/users';
import Server from '../../../index';
import db from '../../../startup/db.js';
import logger from '../../../startup/logger.js';

describe("test Authentication", () => {
    let endPoint = '/api/v1/auth/'
    let Faker = new Chance
    let server;

    beforeAll(async () => {
        server = await Server()
        logger()
        await db()
    })
    afterAll(async () => {
        await server.close()
    })

    it("register a new user", async () => {
        let email = Faker.email()
        let data = {
            "email": email,
            "password": "password123456"
        }
        let result = await request(server)
            .post(endPoint + 'register')
            .send(data)
        let user = await User.findOne({email:email})

        expect(user).toBeTruthy()
        expect(result.statusCode).toBe(201)
    })


    it("should return a valid token for given user", () => {
        
    })

    it("should identify a logged in user", () => {

    })

})
