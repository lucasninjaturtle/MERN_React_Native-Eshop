const {Product} = require('../models/product')
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose')

//GET

// router.get(`/`,async (req,res) =>{
//     const productList = await Product.find().populate('category');
//     !productList ? 
//     res.status(500).json({sucess:false}) :
//     res.send(productList)
// })


//GET with categories

// EXAMPLE http://localhost:3005/api/v1/products?categories=6051138c9120185203391ae7
// and all PRODUCTS http://localhost:3005/api/v1/products

let filter = {}
router.get(`/`,async (req,res) =>{
    if(req.query.categories){
        filter = {category: req.query.categories.split(',')}
    }
    const productList = await Product.find(filter).populate('category');
    !productList ? 
    res.status(500).json({sucess:false}) :
    res.send(productList)
})


//WITH .populate()  I can get the IDs on the Schemas

    // category:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Category',

router.get(`/:id`,async (req,res) =>{
    

    const product = await Product.findById(req.params.id).populate('category');
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


//PUT METHODS

router.put('/:id', async (req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('Invalid product ID')
    }
const category = await Category.findById(req.body.category)

if(!category){
    return res.status(400).send('Invalid Category')
}

    let product = await Product.findByIdAndUpdate(
        req.params.id,
        {
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
        isFeatured: req.body.isFeatured
        },
        {new:true}
    )
    if(!product){
        return res.status(404).send('The product cannot be modified')}
    else{
        res.status(200).send(product);
    }

    
})


//DELETE METHODS

//api/v1/:id"
router.delete('/:id', (req,res)=>{
    Product.findByIdAndRemove(req.params.id)
    .then(product=>{
        if(product){
            return res.status(200).json({success:true, message:'the Product is deleted'})
        }else{
            return res.status(404).json({success:false, message:'Product not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, error: err})
    })
})


//ANALYTICS GET

router.get(`/get/count`,async (req,res) =>{
    

    let productCount = await Product.countDocuments((count)=> count)
    !productCount ? 
    res.status(500).json({sucess:false}) :
    res.send({productCount})
})

//FEATURED


router.get(`/get/featured/:count`,async (req,res) =>{
    
    let count = req.params.count ? req.params.count : 0
    let products = await Product.find({isFeatured:true}).limit(parseInt(count))
    !products ? 
    res.status(500).json({sucess:false}) :
    res.send(products)
})


module.exports = router;