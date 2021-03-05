const {Categories} = require('../models/category')
const express = require('express')
const router = express.Router();

//GET

router.get(`/`,async (req,res) =>{
    const categoriesList = await Categories.find();
    !categoriesList ? 
    res.status(500).json({sucess:false}) :
    res.send(categoriesList)
})





module.exports = router;