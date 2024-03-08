import express from 'express';


const users_router = express.Router({ mergeParams: true });

users_router.get('/', (req, res) => {
    res.send('ok')
})

export default users_router
