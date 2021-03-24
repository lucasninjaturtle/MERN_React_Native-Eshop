const {User} = require('../models/user')
const express = require('express')
const router = express.Router();
//npm install bcryptjs
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
//npm i jsonwebtoken
const jwt = require('jsonwebtoken')

// LOGIN

router.post('/login', async(req,res) =>{
    let user = await User.findOne({email:req.body.email})
    const secret = process.env.secret;
    if(!user){
        return res.status(400).send('The user was not found')
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
        console.log(user._id)
        const token = jwt.sign(
            {
                userId: user._id,
                isAdmin: user.isAdmin,
            },
            secret
            
            ,{expiresIn: '1d'}
        )
        console.log(token)
        return res.status(200).send({user, token:token})
    }
    else{
        return res.status(400).send('password is wrong!')
    }
    return res.status(200).send(user);
})

//GET


router.get(`/`,async (req,res) =>{
    const userList = await User.find().select('-passwordHash')

    //or it can be done asking the ones I want =>  const userList = await User.find().select('name phone email')
    // or taking out the ones we dont want  =>  const userList = await User.find().select('-passwordHash')
    !userList ? 
    res.status(500).json({sucess:false}) :
    res.send(userList)
})

router.get('/:id', async (req,res)=>{
    const user = await User.findById(req.params.id).select('-passwordHash');
    if(!user){
        return res.status(500).json({success:false, message:'the User with given ID was not found'})
    }else{
        return res.status(200).send(user)
    }
})


//GET USER COUNT

router.get(`/get/count`,async (req,res) =>{
    

    let usersCount = await User.countDocuments((count)=> count)
    !usersCount ? 
    res.status(500).json({sucess:false}) :
    res.send({usersCount})
})




// POST METHODS

//CREATE USERS
router.post('/', async (req,res)=>{

    const saltHash = await bcrypt.genSalt(10);
    const encryptedpassword = await bcrypt.hash(req.body.password, saltHash);


    let user = new User({
        name:req.body.name,
        email:req.body.email,
        passwordHash: encryptedpassword,
        phone:req.body.phone,
        isAdmin:req.body.isAdmin,
        street:req.body.street,
        apartment:req.body.apartment,
        zip:req.body.zip,
        city:req.body.city,
        country:req.body.country,
    
    })
    user = await user.save();

    if(!user){
    return res.status(404).send('The user cannot be created')}
else{
    return res.status(200).send(user);
}
})


//REGISTER

router.post('/register', async (req,res)=>{

    const saltHash = await bcrypt.genSalt(10);
    const encryptedpassword = await bcrypt.hash(req.body.password, saltHash);

    console.log(encryptedpassword)

    let user = new User({
        name:req.body.name,
        email:req.body.email,
        passwordHash: encryptedpassword,
        phone:req.body.phone,
        isAdmin:req.body.isAdmin,
        street:req.body.street,
        apartment:req.body.apartment,
        zip:req.body.zip,
        city:req.body.city,
        country:req.body.country,
    
    })
    user = await user.save();

    if(!user){
    return res.status(404).send('The user cannot be created')}
else{
    return res.status(200).send(user);
}
})

//DELETE METHODS

//api/v1/:id"
router.delete('/:id', (req,res)=>{
    User.findByIdAndRemove(req.params.id)
    .then(user=>{
        if(user){
            return res.status(200).json({success:true, message:'the User was deleted'})
        }else{
            return res.status(404).json({success:false, message:'User not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, error: err})
    })
})



module.exports = router;