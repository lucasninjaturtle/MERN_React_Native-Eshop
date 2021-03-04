const express = require('express')
const app = express ();
const bodyParser = require('body-parser')


// Midleware
app.use(bodyParser.json());



require('dotenv/config');

const api = process.env.API
const backUrl = process.env.BACKEND_URL

//          PORT, URL   / API  /  API END
// http://localhost:3005/api/v1/products


app.get(`${api}/products`,(req,res) =>{
    res.send(' asd')
})


app.listen (3005, ()=>{
    
    console.log (`listening on ${backUrl}`)
    console.log(api)
})