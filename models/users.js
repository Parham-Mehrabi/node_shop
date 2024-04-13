import mongoose from 'mongoose'
import Joi from 'joi';
import Jwt from 'jsonwebtoken';
import config from 'config';
import bycrypt from 'bcrypt';


const userSchema = new mongoose.Schema({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(10),
    profilePicture: {
        data: Buffer,
        contentType: String,
    },
    address: [String],
    isActive: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
})

userSchema.pre('save', async function (next){

    if (!this.isModified("password")) {
        // avoid hashing same password twice
        return next()
    }
    const hashed_password = await bycrypt.hash(this.password, 12);
    this.password = hashed_password;
    return next()
})

userSchema.index({ email: 1 });
  
userSchema.methods.generateAuthToken = function() {
    const token = Jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
            isAdmin: this.isAdmin
        },
        config.get('JWT_SECRET')
    )
    return token
}

const User = mongoose.model('User', userSchema);

export default User;
