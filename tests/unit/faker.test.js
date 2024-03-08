import mongoose from 'mongoose';
import fakeUser from '../../faker/create_user.js';
import User from '../../models/users.js';
import fakeCategory from '../../faker/create_category.js';
import Category from '../../models/category.js';
import fakeProduct from '../../faker/create_products.js';
import Product from '../../models/products.js';
import db from '../../startup/db.js';
import logger from '../../startup/logger.js';

describe("Testing fakers", () => {
    beforeAll(async () => {
        logger()
        await db()
    })
    it("should create 10 random users", async () => {
        let before_count = (await User.find({})).length
        await fakeUser(10)
        let after_count = (await User.find({})).length
        expect(before_count).toBe(5)
        expect(after_count).toBe(15)
    });


    it("should create 10 random category", async () => {
        let before_count = (await Category.find({})).length
        await fakeCategory(10)
        let after_count = (await Category.find({})).length
        expect(before_count).toBe(5)
        expect(after_count).toBeGreaterThanOrEqual(15)
    }); 

    it("should create 10 random categories and 20 products products", async () => {
        let before_count_cate = (await Category.find({})).length
        await fakeCategory(10)
        let after_count_cate = (await Category.find({})).length
        let before_count_prod = (await Product.find({})).length
        await fakeProduct(20)
        let after_count_prod = (await Product.find({})).length
        expect(after_count_cate).toBeGreaterThanOrEqual(before_count_cate + 10)   // category count after faker
        expect(after_count_prod).toBeGreaterThanOrEqual(before_count_prod + 20)   // category count after
    }); 

});
