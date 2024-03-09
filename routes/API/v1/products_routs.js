import express from 'express';
import Product from '../../../models/products.js';
import mongoose from 'mongoose';

const products_router = express.Router({ mergeParams: true });


products_router.get('/category/', (req, res) => {
    res.status(200).send('ok')
})

products_router.get('/', async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})


products_router.get('/:id', async (req, res) => {
    const id = req.params.id
    if (mongoose.Types.ObjectId.isValid(id)){
        const product = await Product.findById(id)
        product ? res.send(product) : res.status(404).send('Not Found')
        return
    }
    return res.status(400).send("Bad Request")
})

products_router.post('/', async (req, res) => {
    const new_product = req.body
    if (!new_product) return res.status(400).send('Bad Request')
    try {
        await Product.validate(new_product)
        await new Product(new_product).save()
        return res.status(201).send('ok')
    }
    catch (e) {
        return res.status(400).send('nok')
    }
})


products_router.post('/:id', (req, res) => {
    res.send('ok')
})



export default products_router
