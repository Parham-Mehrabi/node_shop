import authentication from "../../../middleware/authentication"
import User from '../../../models/users'
import mongoose from "mongoose";
import { jest } from '@jest/globals'
import Jwt from "jsonwebtoken"
import config from "config"


describe("testing authentication middle", () => {
    const user = new User({
        email: "auth@middleware.com",
        name: "auth_user",
        _id: new mongoose.Types.ObjectId().toHexString(),
    })


    it("should populate the req.user with a valid token", () => {
        const token = user.generateAuthToken()
        const res = {}
        const req = { headers: { jwt_token: token } }      // request without token
        const next = jest.fn()
        authentication(req, res, next)
        expect(req.user._id).toBe(user._id.toString())
    })

    it("should set user to anonymous if no token is set", () => {
        const res = {}
        const req = { headers: {} }      // request without token
        const next = jest.fn()
        authentication(req, res, next)

        expect(req.user.name).toBe("anonymous")
        expect(req.user.message).toBe("unauthorized")
    })


    it("should set user to anonymous for Invalid token Signature", () => {
        const token = Jwt.sign(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            },
            "INVALID_SECRET_KEY"
        )
        const res = {}
        const req = { headers: { jwt_token: token } }      // request without token
        const next = jest.fn()
        authentication(req, res, next)

        expect(req.user.name).toBe("anonymous")
        expect(req.user.message).toBe("invalid signature")
    })

    it("should set user to anonymous expired tokens", () => {
        const token = Jwt.sign(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            },
            config.get("JWT_SECRET"),
            { expiresIn: 0 }
        )
        const res = {}
        const req = { headers: { jwt_token: token } }      // request without token
        const next = jest.fn()
        authentication(req, res, next)

        expect(req.user.name).toBe("anonymous")
        expect(req.user.message).toBe("jwt expired")
    })


})
