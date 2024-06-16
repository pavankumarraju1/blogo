import { validateToken } from "../service/auth.js"

function checkAuthCookie(cookieName) {
    return (req, res, next) => {
        const tokenVal = req.cookies[cookieName]
        //console.log(tokenVal)
        if (!tokenVal) { 
            next();
        }
        else {
            try {
                const userPayload = validateToken(tokenVal);
                req.user = userPayload;
            } catch (error) { console.log("error in middleware", error) }
            next();
        }
    }
}

export default checkAuthCookie;