import mongoose from 'mongoose';
import Product from '../../models/products.js';
import fakeProduct from '../../faker/create_products.js';
import get_random_product from '../../utils/get_random_product.js';

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
