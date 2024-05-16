import jwt from 'jsonwebtoken';
import config from 'config';
import { SAFE_METHODS } from '../constants/methods';


export default async function authorize(req, res, next) {
    const token = req.headers.jwt_token
    req.user = { name: "anonymous", message: "unauthorized" }
    if (token) {
        const user = jwt.decode(token, config.get("JWT_SECRET"))
        if (user) {
            try {
                jwt.verify(token, config.get("JWT_SECRET"))
                req.user = user;
            } catch (e) {
                req.user.message = e.message
            }
        }
    }
    next()
}

export async function isAdminOrReadOnly(req, res, next) {
    if (req.user.isAdmin) next()                                      // is admin
    else if (SAFE_METHODS.includes(req.method)) next()               // or readonly
    else return res.status(405).send("Method not Allowed")          // return 405 (Method Not Allowed)
}

export async function isAdmin(req, res, next) {
    if (req.user.isAdmin) next()
    else return res.status(403).send("Forbidden")
}

export async function isAuthenticatedOrReadOnly(req, res, next) {
    if (req.user.name !== "anonymous") next()                         // is authenticated
    else if (SAFE_METHODS.includes(req.method)) next()               // or readonly
    else return res.status(405).send("Method not Allowed")          // return 405 (Method Not Allowed)
}
export async function isAuthenticated(req, res, next) {
    if (req.user.name !== "anonymous") next()                       // is authenticated
    else return res.status(401).send("Unauthorized")               // return 401 (Unauthorized)                       
}
