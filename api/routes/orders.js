const {Order} = require('../models/order')
const express = require('express');
const { OrderItem } = require('../models/order-item');
const router = express.Router();

//GET

router.get('/:id', async (req, res) =>{
    // -1 NEWEST TO OLDEST (sort method)
    const order = await Order.findById(req.params.id)
    .populate('user')
    //we can encacpsulete the searchs with {path:'', populate:'}
    .populate({path:'orderItems', populate: {
                path:'product', populate:'category'}
            })
    !order ? res.status(500).json({success:false}) :
    res.send(order);
})

router.get('/', async (req, res) =>{
    // -1 NEWEST TO OLDEST (sort method)
    const order = await Order.find().populate('user').sort({"dateOrdered":-1});

    !order ? res.status(500).json({success:false}) :
    res.send(order);
})

// POST METHODS
router.post('/', async (req,res)=>{
    // Loop for every order Item and save everyone on de DB
    const orderitemsId = Promise.all(req.body.orderItems.map(async orderitem =>{
        let newOrderItem = new OrderItem({
            quantity:orderitem.quantity,
            product: orderitem.product
        })
        newOrderItem = await newOrderItem.save()

        //devuelvo los ids
        return newOrderItem._id
    }))
    const orderItemsIdsPromiseResolved = await orderitemsId

    console.log(orderItemsIdsPromiseResolved)

    let order = new Order({
        orderItems:orderItemsIdsPromiseResolved ,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country:req.body.country,
        phone:req.body.phone,
        status:req.body.status,
        totalPrice:req.body.totalPrice,
        user:req.body.user,
    })
    order = await order.save();

    if(!order){
    return res.status(404).send('The order cannot be created')}
else{
    res.status(200).send(order);
}
})


//PUT FOR STATUS

router.put('/:id', async (req,res)=>{
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status:req.body.status,
        },
        {new:true}
    )
    if(!order){
        return res.status(404).send('The order cannot be modified')}
    else{
        res.status(200).send(order);
    }

    
})

//DELETE METHODS

//api/v1/:id"
router.delete('/:id', (req,res)=>{
    Order.findByIdAndRemove(req.params.id)
    .then(order=>{
        if(order){
            return res.status(200).json({success:true, message:'the order was deleted'})
        }else{
            return res.status(404).json({success:false, message:'order not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, error: err})
    })
})

module.exports = router;