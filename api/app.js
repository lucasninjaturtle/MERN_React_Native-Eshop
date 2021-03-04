const express = require('express')
const app = express ();
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require ('mongoose')

//Models
const Product = require('./models/product') 

// CONSTANTS
require('dotenv/config');

const api = process.env.API
const backUrl = process.env.BACKEND_URL
const productsRouter = require('./routers/product')



// Midleware
app.use(bodyParser.json());
app.use(morgan('tiny'))

app.use(`${api}/products`, productsRouter)



//          PORT, URL   / API  /  API END
// http://localhost:3005/api/v1/products


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


//APP LISTEN
app.listen (3005, ()=>{
    
    console.log (`listening on ${backUrl}`)
    console.log(api)
})