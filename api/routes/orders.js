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


//GET TOTAL SALES $$$

router.get('/get/totalsales', async (req, res)=>{
    const totalSales = await Order.aggregate([
        { $group: { _id:null, totalsales: {$sum : '$totalPrice'}}}
    ])
    !totalSales ? 
    res.status(500).json({sucess:false}) :
    res.send({totalsales: totalSales.pop().totalsales})
})


//ANALYTICS GET

router.get(`/get/count`,async (req,res) =>{
    

    let orderCount = await Order.countDocuments((count)=> count)
    !orderCount ? 
    res.status(500).json({sucess:false}) :
    res.send({orderCount})
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

    const totalPrices = await Promise.all(orderItemsIdsPromiseResolved.map(async (orderItemId)=>{
        const orderItem = await OrderItem.findById(orderItemId).populate("product", "price")
        const totalPrice = orderItem.product.price * orderItem.quantity
        return totalPrice;
    }))

    console.log(totalPrices)

    const totalPrice = totalPrices.reduce((a,b) => a+b, 0)

    let order = new Order({
        orderItems:orderItemsIdsPromiseResolved ,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country:req.body.country,
        phone:req.body.phone,
        status:req.body.status,
        totalPrice:totalPrice,
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
    .then(async order=>{
        if(order){
            await order.orderItems.map(async orderItem =>{
                await OrderItem.findByIdAndRemove(orderItem)
            })
            return res.status(200).json({success:true, message:'the order was deleted'})
        }else{
            return res.status(404).json({success:false, message:'order not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, error: err})
    })
})


//GET ORDERS BY USER


router.get('/get/userorders/:userid', async (req, res) =>{
    // -1 NEWEST TO OLDEST (sort method)
    const UserOrderList = await Order.find({user: req.params.userid})
    .populate({path:'orderItems', populate: {
        path:'product', populate:'category'}
    })
    .sort({"dateOrdered":-1});

    !UserOrderList ? res.status(500).json({success:false}) :
    res.send(UserOrderList);
})



module.exports = router;