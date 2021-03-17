const expressJwt = require('express-jwt')

// npm install express-jwt

function authJwt (){
    const secret = process.env.secret;
    const api = process.env.API
    return expressJwt({
        secret,
        algorithms:['HS256'] 
    }).unless({
        path:[
            {url:`${api}/products`, methods:['GET', 'OPTIONS']},
            `${api}/users/login`,
            `${api}/users/register`,
        ]
    })
}

module.exports = authJwt;