const express = require('express');

const products_router = express.Router({ mergeParams: true });

products_router.get('/', (req, res) => {
    res.send('ok')
})

module.exports = products_router
