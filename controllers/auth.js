let jwt = require('jsonwebtoken');
let secret = '12kjt25';

// Function that generate a token
function generateToken(user){
    let payload = {
        email: user.email,
        password: user.password
    }
   return jwt.sign(payload, secret);
}

// Function that check if the token is the correct one 
function checkToken(token){
   return jwt.verify(token, secret);
}

module.exports = { generateToken, checkToken }