import express from 'express';
import User from '../../../models/users.js';
import Joi from 'joi';

const auth_routes = express.Router({mergeParams: true});


const EmailSchema = Joi.object({
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().required()
    // FIXME: validate password complexity
})

// register (create_user)
auth_routes.post('/register', async (req, res) => {

    // validate user's input
    const data = EmailSchema.validate(req.body);
    // return error if input have problem
    if (data.error) return res.status(400).send(data.error);
    
    const user = new User(data.value);
    await user.save();
    res.status(201).send(`${user.email} created`);

})

// authentication (get_token)
auth_routes.post('/login', async() => {
    
})

// authorization (verify_token)

// logout (revoke_token)


export default auth_routes;
