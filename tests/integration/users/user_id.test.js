import request from 'supertest';
import Server from '../../../index.js';
import get_random_user from "../../../utils/get_random_user";

describe("Testing /api/v1/users/:id", () => {
    let server;
    let endPoint = "/api/v1/users/"
    let user
    beforeAll(async () => {
        server = await Server();
        user = await get_random_user()
    })
    afterAll(async () => {
        await server.close()
    })
    it("should retrieve user with its id", () => {
        let result = request(server).get(endPoint + user._id.toString())
        // FIXME
    })
})