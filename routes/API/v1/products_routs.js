import express from 'express';

const products_router = express.Router({ mergeParams: true });

products_router.get('/', (req, res) => {
    res.send('ok')
})

export default products_router
