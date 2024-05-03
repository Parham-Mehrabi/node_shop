import * as authentication from "../../../middleware/authentication"
import User from '../../../models/users'
import mongoose from "mongoose";
import { jest } from '@jest/globals'
import Jwt from "jsonwebtoken"
import config from "config"
// import

describe("Testing authentication middlewares", () => {
    describe("testing authorize middleware", () => {

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
            authentication.authorize(req, res, next)
            expect(req.user._id).toBe(user._id.toString())
        })

        it("should set user to anonymous if no token is set", () => {
            const res = {}
            const req = { headers: {} }      // request without token
            const next = jest.fn()
            authentication.authorize(req, res, next)

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
            authentication.authorize(req, res, next)

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
            authentication.authorize(req, res, next)

            expect(req.user.name).toBe("anonymous")
            expect(req.user.message).toBe("jwt expired")
        })
    })

    describe("testing isAdmin", () => {
        it("should return 403 for not admins", async () => {

            
            const res = {status:jest.fn()}
            const req = {user: {isAdmin:false}}
            const next = jest.fn()

            authentication.isAdmin(req, res, next)

            expect(res.status).toHaveBeenCalledWith(403)
            expect(next).not.toHaveBeenCalled()
        })
        it("should return 400 for not authorized users", async () => {
            const res = {status:jest.fn()}
            const req = {user: "anonymous"}
            const next = jest.fn()

            authentication.isAdmin(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(next).not.toHaveBeenCalled()
        })
        it("should pass to the next function for admins", async () => {
            const res = {}
            const req = {user: "anonymous"}
            const next = jest.fn()

            authentication.isAdmin(req, res, next)

            expect(next).toHaveBeenCalled()
        })

    })
    describe("testing isAdminOrReadOnly", () => {
        it("should return pass to next function for Safe methods", () => {
            const res = {}
            const req = {user: "anonymous", method: "GET"}
            const next = jest.fn()

            authentication.isAdminOrReadOnly(req, res, next)

            expect(next).toHaveBeenCalled()
        })
        it("should return 405 for Unsafe methods from not admins", () => {
            const res = {status: jest.fn()}
            const req = {user: "anonymous", method: "POST"}
            const next = jest.fn()

            authentication.isAdminOrReadOnly(req, res, next)

            expect(res.status).toHaveBeenCalledWith(405)
            expect(next).not.toHaveBeenCalled()
        })
        it("should pass to next function for admins with Unsafe method", () => {
            const res = {}
            const req = {user: {isAdmin:true}, method: "POST"}
            const next = jest.fn()

            authentication.isAdminOrReadOnly(req, res, next)

            expect(next).toHaveBeenCalled()
        })
    })

})
