import User from "../../models/users.js"
import config from "config";
import jwt from "jsonwebtoken";


describe("testing User model", () => { 
    it("should test User.generateAuthToken",() => {
        const user = User();
        user.isAdmin = true;
        user.email = "test@test.com";
        const token = user.generateAuthToken();
        const decoded = jwt.decode(token, config.get("JWT_SECRET"));
        const time = Math.trunc(Date.now() / 1000);

        expect(decoded.email).toBe(user.email);
        expect(decoded._id).toBe(user._id.toString());
        expect(decoded.isAdmin).toBe(true);
        expect(decoded.iat).toBe(time);
    })
})