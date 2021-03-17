const {User} = require('../models/user')
const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

//GET


router.get(`/`,async (req,res) =>{
    const userList = await User.find()
    !userList ? 
    res.status(500).json({sucess:false}) :
    res.send(userList)
})



module.exports = router;