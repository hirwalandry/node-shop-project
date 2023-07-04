const express = require('express')
const Product = require('../models/Product')
const auth = require('../middleware/auth')
const authRole  = require('../middleware/userRole')
const ROLE = require('../models/role')
const productOut = require('../models/productOut')

const router = new express.Router()

router.post('/boughtProduct', auth, authRole(ROLE.user), async(req, res) => {
    const boughtProperty = Object.keys(req.body)
    const boughtPropertyArray = ['productName', 'quantity']
    const checkPropertyToBought = boughtProperty.every((boughtPro) => boughtPropertyArray.includes(boughtPro))
    if(!checkPropertyToBought){
        res.status(400).send({ error: 'sorry insert appropriate property' })
    }
    try {
        const product = await Product.find({})
        
        if(product[0].quantity <= req.body.quantity){
            res.status(400).send()
        } 
        const newQuantity = product[0].quantity - parseInt(req.body.quantity)
        await Product.updateOne({_id: product[0]._id}, {quantity : newQuantity})

    } catch (e) {
        res.status(500).send()
    }
     productOutSave = new productOut({
         ...req.body, 
         USER: req.user._id
    })
    
    try {
        await productOutSave.save()
        res.status(201).send(productOutSave)
    } catch (e) {
        res.status(400).send()
    }
})
router.get('/reportOut', auth, authRole(ROLE.user), async(req, res) => {
    try {
        await productOut.find({ })
        // console.log(product)
        await req.user.populate({
            path: 'prosOut',
            populate:{
                path: 'productName',
                select: 'productName'

            },
            populate: {
                path: 'USER',
                select: 'userName'
            
        },
    })
    console.log(req.user.prosOut)
        res.send(req.user.prosOut)
    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router