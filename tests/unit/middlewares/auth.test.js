import authentication from "../../../middleware/authentication"
import User from '../../../models/users'
import mongoose from "mongoose";
import {jest} from '@jest/globals'

describe("testing authentication middle", () => {
    const user = new User({
        email: "auth@middleware.com",
        _id: new mongoose.Types.ObjectId().toHexString(),
        isAdmin: true
    })

    it("should set user to anonymous if no token is set", () => {
        const res = {}
        const req = {}      // request without token
        const next = jest.fn()
        authentication(req, res, next)
        expect(req.user).toBe("anonymous")
    })
})