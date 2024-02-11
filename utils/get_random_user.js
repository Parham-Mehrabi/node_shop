const mongoose = require('mongoose')
const config = require('config')
const User = require('../models/users')


async function get_random_user() {
    //  return a random user from db

    try {

        // connect db
        await mongoose.connect(config.get('db'))

        // get user counts
        const user_count = await User.countDocuments();

        // choose an index for users:
        const chosen = Math.floor(Math.random() * user_count)

        // get the user
        const random_user = User.aggregate(
            [
                { $skip: chosen },
                { $limit: 1 }
            ]
        ).exec()
        
        console.log('-------')
        console.log(await random_user)
        return random_user
    } catch (e) { console.log(e) }
}

module.exports = get_random_user
