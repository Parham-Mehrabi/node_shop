const request = require('supertest')


describe('test end points response codes', () => {
    let server;
    beforeAll(async () => {
        server = await require('../../index')
    })
    afterAll(async () => {
        await server.close()
    })
    describe('/api/v1/products/', () => {
        it('Should return 200 for /', async () => {
            const result = await request(server).get('/api/v1/products/')
            expect(result.status).toBe(200)
        })
    })
})
