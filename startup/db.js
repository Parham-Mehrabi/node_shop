const mongoose = require('mongoose')

module.exports = async function () {
    // TODO use Environment Variable for database URL
    await mongoose.connect('mongodb://localhost:27017/demo_shop_node')
    console.log('Connected To Database')
}
