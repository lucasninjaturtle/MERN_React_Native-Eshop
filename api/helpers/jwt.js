const expressJwt = require('express-jwt')

// npm install express-jwt

function authJwt (){
    const secret = process.env.secret;
    const api = process.env.API
    return expressJwt({
        secret,
        algorithms:['HS256'],
        isRevoked: isRevoked
    }).unless({
        path:[
            //test on www.regex101.com with /\/api\/v1\/products(.*)/  and example: /api/v1/products/get/features/4
            {url: /\/public\/uploads(.*)/, methods:['GET', 'OPTIONS']},
            {url: /\/api\/v1\/products(.*)/, methods:['GET', 'OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/, methods:['GET', 'OPTIONS']},
            // `${api}/users`,
            `${api}/users/login`,
            `${api}/users/register`,
            `${api}/orders`,
        ]
    })
}


//REJECT the token is not admin
async function isRevoked (req, payload, done){
    if(!payload.isAdmin){
        return done(null, true)
    }
    done();

}

module.exports = authJwt;