const mongoose = require('mongoose')
const chance = require('chance');
const User = require('../models/users');

const Faker = new chance
const COUNT = parseInt(process.argv[2]) || 10


for (let i=COUNT; i; i--){
    console.log(Faker.name())
}