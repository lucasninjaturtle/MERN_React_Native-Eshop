const {Product} = require('../models/product')
const express = require('express')
const router = express.Router();

//GET

router.get(`/`,async (req,res) =>{
    const productList = await Product.find();
    !productList ? 
    res.status(500).json({sucess:false}) :
    res.send(productList)
})


//POST
router.post(`/`,(req,res) =>{
    const product = new Product({
        name:req.body.name,
        image:req.body.image,
        stock:req.body.stock,
    })
    product.save().then((createdProduct =>{
        res.status(201).json(createdProduct)
    })).catch(err=>{
        res.status(500).json({
            error:err,
            sucess:false,
        })
    })
})


module.exports = router;