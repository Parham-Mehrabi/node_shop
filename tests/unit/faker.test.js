import mongoose from 'mongoose';
import fakeUser from '../../faker/create_user.js';
import User from '../../models/users.js';
import fakeCategory from '../../faker/create_category.js';
import Category from '../../models/category.js';
import fakeProduct from '../../faker/create_products.js';
import Product from '../../models/products.js';
import db from '../../startup/db';
import logger from '../../startup/logger';


describe("Testing fakers", () => {
    beforeAll(async () => {
        logger()
        await db()
    })
    afterAll(() => {
        mongoose.connection.close()
    })

    it("should create 10 random users", async () => {
        await User.deleteMany({})
        let before_count = (await User.find({})).length
        await fakeUser(10)
        await db()
        let after_count = (await User.find({})).length
        expect(before_count).toBe(0)
        expect(after_count).toBe(10)
    });


    it("should create 10 random category", async () => {
        await Category.deleteMany({})
        let before_count = (await Category.find({})).length
        await fakeCategory(10)
        let after_count = (await Category.find({})).length
        expect(before_count).toBe(0)
        expect(after_count).toBe(10)
    }); 

    it("should create 10 random categories and 20 products products", async () => {
        await Category.deleteMany({})
        await Product.deleteMany({})
        let before_count_cate = (await Category.find({})).length
        await fakeCategory(10)
        let after_count_cate = (await Category.find({})).length
        let before_count_prod = (await Product.find({})).length
        await fakeProduct(20)
        let after_count_prod = (await Product.find({})).length

        expect(before_count_cate).toBe(0)   // category count before faker
        expect(before_count_prod).toBe(0)   // products count before faker
        expect(after_count_cate).toBe(10)   // category count after faker
        expect(after_count_prod).toBe(20)   // category count after
    }); 

});
