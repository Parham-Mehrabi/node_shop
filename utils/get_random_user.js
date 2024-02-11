const mongoose = require('mongoose')
const config = require('config')
const User = require('../models/users')


async function get_random_user() {
    //  return a random user from db
    try {
        
        // get user counts
        const user_count = await User.countDocuments();

        // choose an index for users:
        const chosen = Math.floor(Math.random() * user_count)

        // get the user
        const random_user = await User.aggregate(
            [
                { $skip: chosen },
                { $limit: 1 }
            ]
        ).exec();        
        return random_user[0]
    } catch (e) { console.log(e) }

}

module.exports = get_random_user
