import express from 'express';
import Product from '../../../models/products';


const products_router = express.Router({ mergeParams: true });

products_router.get('/', async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})


products_router.get('/:id', (req, res) => {
    res.send('ok')
})

products_router.post('/', (req, res) => {
    res.status(201).send('ok')
})


products_router.post('/:id', (req, res) => {
    res.send('ok')
})

export default products_router
