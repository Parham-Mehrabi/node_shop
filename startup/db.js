const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston')

module.exports = async function () {
    const db = config.get('db')
    await mongoose.connect(db)
    winston.info('Db Connected at ' + db)
}
