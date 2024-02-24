const mongoose = require('mongoose')
const get_random_product = require('../../utils/get_random_product')
const Product = require('../../models/products')
const get_random_user = require('../../utils/get_random_user')
const fakeProduct = require('../../faker/create_products')

describe("Testing Utils", () => {

    beforeAll(async () => {
        require('../../startup/logger')()
        await require('../../startup/db')()
        await fakeProduct(10) 
    })
    afterAll(async () => {
        await mongoose.connection.close()
    })

    it("should retrieve a random product", async () => {
        const random_product = await get_random_product()
        const ProductObject = await Product.findById(random_product._id); 
        const result = ProductObject instanceof Product

        expect(ProductObject).toBeInstanceOf(Product)
        expect(result).toBeTruthy()
    })

})
