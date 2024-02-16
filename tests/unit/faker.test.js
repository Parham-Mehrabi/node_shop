const mongoose = require('mongoose')
const fakeUser = require('../../faker/create_user');
const User = require('../../models/users');
const fakeCategory = require('../../faker/create_category');
const Category = require('../../models/category');
const fakeProduct = require('../../faker/create_products')
const Product = require('../../models/products')


describe("Testing fakers", () => {
    beforeEach(async () => {
        require('../../startup/logger')()
        await require('../../startup/db')()
        await User.deleteMany({})
        await Category.deleteMany({})
        await Product.deleteMany({})
    })
    afterEach(() => {
        mongoose.connection.close()
    })

    it("should create 10 random users", async () => {
        let before_count = (await User.find({})).length
        await fakeUser(10)
        await require('../../startup/db')()
        let after_count = (await User.find({})).length
        expect(before_count).toBe(0)
        expect(after_count).toBe(10)
    });


    it("should create 10 random category", async () => {
        let before_count = (await Category.find({})).length
        await fakeCategory(10)
        let after_count = (await Category.find({})).length
        expect(before_count).toBe(0)
        expect(after_count).toBe(10)
    }); 

    it("should create 10 random categories and 20 products products", async () => {
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
