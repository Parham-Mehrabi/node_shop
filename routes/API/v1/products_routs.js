import express from 'express';

const products_router = express.Router({ mergeParams: true });

products_router.get('/', (req, res) => {
    res.send('ok')
})


products_router.get('/:id', (req, res) => {
    res.send('ok')
})

products_router.post('/', (req, res) => {
    res.send('ok')
})


products_router.post('/:id', (req, res) => {
    res.send('ok')
})

export default products_router
