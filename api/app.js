const express = require('express')
const app = express ();
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require ('mongoose')
const cors = require('cors')

//ENABLE CORS BEFORE ANYTHING
app.use(cors())
//ALLOWING ALL HTTP REQUEST  with *
app.options('*', cors())

//Models
const Product = require('./models/product') 
const Category = require('./models/category') 
const Order = require('./models/order') 
const User = require('./models/user')

// CONSTANTS
require('dotenv/config');

const api = process.env.API
const backUrl = process.env.BACKEND_URL



// Midleware
app.use(bodyParser.json());
app.use(morgan('tiny'))


//Routes
const categoriesRoutes = require('./routes/categories')
const productsRoutes = require('./routes/product')
const usersRoutes = require ('./routes/users')
const ordersRoutes = require ('./routes/orders')



app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/users`, usersRoutes)
app.use(`${api}/orders`, ordersRoutes)


//DATABASE


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


//APP LISTEN SERVER

app.listen (3005, ()=>{
    
    console.log (`listening on ${backUrl}`)
    console.log(api)
})