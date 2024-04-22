import jwt from 'jsonwebtoken';
import config from 'config';

export default async function (req, res, next) {
    const token = req.headers.jwt_token
    req.user = {name: "anonymous", message: "unauthorized"}
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
