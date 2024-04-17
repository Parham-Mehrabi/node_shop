import express from 'express';
import User from '../../../models/users.js';
import Joi from 'joi';
import bycrypt from 'bcrypt';

const auth_routes = express.Router({mergeParams: true});


const UserFormSchema = Joi.object({
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().required()
    // FIXME: validate password complexity
})

// register (create_user)
auth_routes.post('/register', async (req, res) => {

    // validate user's input
    const data = UserFormSchema.validate(req.body);
    // return error if input have problem
    if (data.error) return res.status(400).send(data.error);
    
    const user = new User(data.value);
    await user.save();
    res.status(201).send(`${user.email} created`);

})

// authentication (get_token)
auth_routes.post('/login', async(req, res) => {
    const data = UserFormSchema.validate(req.body);
    if (data.error) return res.status(400).send(data.error)

    const user = await User.findOne({email: data.value.email});
    // check if user with that email exist
    if (!user) return res.status(400).send("Invalid Email or Password")

    const ValidPassword = await bycrypt.compare(data.value.password, user.password)
    // check if password matched
    if (!ValidPassword) return res.status(400).send("Invalid Email or Password")

    const token = user.generateAuthToken()
    return res.json({token: token})
})

// authorization (verify_token)

// logout (revoke_token)


export default auth_routes;
