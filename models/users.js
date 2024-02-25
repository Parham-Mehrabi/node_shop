import mongoose from 'mongoose'
import { isEmail } from 'validator';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Invalid email format']
    },
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
