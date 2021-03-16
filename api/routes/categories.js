const {Category} = require('../models/category')
const express = require('express')
const router = express.Router();

//GET METHODS

router.get(`/`,async (req,res) =>{
    const categoriesList = await Category.find();
    if(!categoriesList){
    res.status(500).json({sucess:false})
}else{
    res.status(200).send(categoriesList)
}
})

router.get('/:id', async (req,res)=>{
    const category = await Category.findById(req.params.id);
    if(!category){
        res.status(500).json({success:true, message:'the category with given ID was not found'})
    }else{
        res.status(200).send(category)
    }
})


// POST METHODS
router.post('/', async (req,res)=>{
    let category = new Category({
        name:req.body.name,
        icon:req.body.icon,
        color:req.body.color,
    })
    category = await category.save();

    if(!category){
    return res.status(404).send('The category cannot be created')}
else{
    res.status(200).send(category);
}
})


//DELETE METHODS

//api/v1/:id"
router.delete('/:id', (req,res)=>{
    Category.findByIdAndRemove(req.params.id)
    .then(category=>{
        if(category){
            return res.status(200).json({success:true, message:'the category is deleted'})
        }else{
            return res.status(404).json({success:false, message:'category not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, error: err})
    })
})

//PUT METHODS


router.put('/:id', async (req,res)=>{
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        },
        {new:true}
    )
    if(!category){
        return res.status(404).send('The category cannot be modified')}
    else{
        res.status(200).send(category);
    }

    
})

module.exports = router;