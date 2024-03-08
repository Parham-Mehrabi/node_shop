import Product from '../../models/products.js';
import get_random_product from '../../utils/get_random_product.js';
import db from '../../startup/db.js';
import logger from '../../startup/logger.js';


describe("Testing Utils", () => {
    beforeAll(async () => {
        logger()
        await db()
    })

    it("should retrieve a random product", async () => {
        const random_product = await get_random_product()
        const ProductObject = await Product.findById(random_product._id); 
        const result = ProductObject instanceof Product

        expect(ProductObject).toBeInstanceOf(Product)
        expect(result).toBeTruthy()
    })

})
