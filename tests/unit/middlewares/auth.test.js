import authentication from "../../../middleware/authentication"
import User from '../../../models/users'
import mongoose from "mongoose";
import {jest} from '@jest/globals'

describe("testing authentication middle", () => {
    const user = new User({
        email: "auth@middleware.com",
        _id: new mongoose.Types.ObjectId().toHexString(),
    })


    it("should populate the req.user with a valid token", () => {
        const token = user.generateAuthToken()
        const res = {}
        const req = {headers: {jwt_token: token}}      // request without token
        const next = jest.fn()
        authentication(req, res, next)
        expect(req.user._id).toBe(user._id.toString())
    })

    it("should set user to anonymous if no token is set", () => {
        const res = {}
        const req = {headers: {}}      // request without token
        const next = jest.fn()
        authentication(req, res, next)
        expect(req.user).toBe("anonymous")
    })
    
})