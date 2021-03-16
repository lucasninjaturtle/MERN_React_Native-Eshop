const {Product} = require('../models/product')
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();

//GET

router.get(`/`,async (req,res) =>{
    const productList = await Product.find();
    !productList ? 
    res.status(500).json({sucess:false}) :
    res.send(productList)
})

router.get(`/:id`,async (req,res) =>{
    const product = await Product.findById(req.params.id);
    !product ? 
    res.status(500).json({sucess:false}) :
    res.send(product)
})


//POST
router.post(`/`,async (req,res) =>{
const category = await Category.findById(req.body.category)

if(!category){
    return res.status(400).send('Invalid Category')
}

    let product = new Product({
        name: req.body.name,
        description:req.body.description,
        richDescription:req.body.richDescription,
        image:req.body.image,
        brand:req.body.brand,
        price:req.body.price,
        category:req.body.category,
        CountInStock:req.body.CountInStock,
        rating: req.body.raiting,
        numReviews:req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })

    product = await product.save();

    if(!product){
        return res.status(500).send('The product cannot be created')
    }else{
        res.send(product)
    }


    //MADE WITH PROMISES

    // product.save().then((createdProduct =>{
    //     res.status(201).json(createdProduct)
    // })).catch(err=>{
    //     res.status(500).json({
    //         error:err,
    //         sucess:false,
    //     })
    // })
})


module.exports = router;