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
            //test on www.regex101.com with /\/api\/v1\/products(.*)/  and example: /api/v1/products/get/features/4
            {url: /\/api\/v1\/products(.*)/, methods:['GET', 'OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/, methods:['GET', 'OPTIONS']},
            `${api}/users/login`,
            `${api}/users/register`,
        ]
    })
}

module.exports = authJwt;