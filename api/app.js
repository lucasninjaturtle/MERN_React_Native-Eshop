const express = require('express')
const app = express ();
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require ('mongoose')


// Midleware
app.use(bodyParser.json());
app.use(morgan('tiny'))



require('dotenv/config');

const api = process.env.API
const backUrl = process.env.BACKEND_URL


//          PORT, URL   / API  /  API END
// http://localhost:3005/api/v1/products


app.get(`${api}/products`,(req,res) =>{
    res.send(' asd')
})


//Mongoose

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    dbName: 'eshop-database',
})
.then(()=>{
    console.log('Database conection ready')
})
.catch((err)=>{
    console.log(err)
})

app.listen (3005, ()=>{
    
    console.log (`listening on ${backUrl}`)
    console.log(api)
})