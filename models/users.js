import mongoose from 'mongoose'
import Joi from 'joi';

const userSchema = new mongoose.Schema({
    email: Joi.string().email().required(),
    profilePicture: {
        data: Buffer,
        contentType: String,
    },
    address: [String],
    isActive: {
        type: Boolean,
        default: true
    },
    isAdmin:  {
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

userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

export default User;
