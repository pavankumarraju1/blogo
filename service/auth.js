import JWT from "jsonwebtoken"

const secret = "@#$%pavan";

function createToken(user){
    const payload={
        _id : user._id,
        email : user.email, 
        name : user.username,
        profileImage : user.profileImage,
    }
    const token = JWT.sign(payload,secret)
    return token;  
}
 
function validateToken(token){
    //console.log(token)
    const payload = JWT.verify(token,secret);
    return payload;
}

export { 
    createToken,
    validateToken
} 