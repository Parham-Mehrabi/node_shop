const mongoose = require('mongoose')
const fakeUser = require('../../faker/create_user');
const User = require('../../models/users');
const fakeCategory = require('../../faker/create_category');
const Category = require('../../models/category');


describe("Testing fakers", () => {
    beforeEach(async () => {
        require('../../startup/logger')()
        await require('../../startup/db')()
        await User.deleteMany({})
        await Category.deleteMany({})
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
        await require('../../startup/db')()
        let after_count = (await Category.find({})).length
        expect(before_count).toBe(0)
        expect(after_count).toBe(10)
    });

});
