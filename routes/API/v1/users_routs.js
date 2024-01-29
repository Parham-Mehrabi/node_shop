const express = require('express');

const users_router = express.Router({ mergeParams: true });

users_router.get('/', (req, res) => {
    res.send('ok')
})

module.exports = users_router
