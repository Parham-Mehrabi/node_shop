import jwt from 'jsonwebtoken';
import config from 'config';

export default function(req, res, next) {
    const token = req.headers.jwt_token
    if (token){
        const user = jwt.decode(token, config.get("JWT_SECRET"))
        if(user){
            req.user = user;
        }else{
            req.user = "anonymous"
        }
    }else{
        req.user = "anonymous"
    }
    next()
}
