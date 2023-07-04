const express = require('express')
const {Product, ProductIn} = require('../models/Product')
const auth = require('../middleware/auth')
const authRole  = require('../middleware/userRole')
const ROLE = require('../models/role')


const router = new express.Router()

router.post('/product',auth, authRole(ROLE.user), async(req, res) => {
    const product = new Product({
        ...req.body,
        USER: req.user._id })  
    const productin = new ProductIn({
            ...req.body,
            USER: req.user._id
        })

    try {
        await product.save()
        await productin.save()
        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
    
})
router.get('/productsInGet',auth, authRole(ROLE.user), async(req, res) => {
    try {
        await Product.find({ USER: req.user._id})
        await req.user.populate({path: 'pros'})
        
        res.send(req.user.pros)
    } catch (e) {
        res.status(500).send()
    }
    
})
router.patch('/productUpdate/:id', auth, authRole(ROLE.user), async(req, res) => {
    const updates = Object.keys(req.body)
    const propertyArray = ['productName', 'dateIn', 'quantity', 'price_$_']
    const checkAllowedItems = updates.every((update) => propertyArray.includes(update))
    
    if(!checkAllowedItems){
        res.status(400).send({ error: 'not included'})
    }
    try {
        const product = await Product.findOne({ _id: req.params.id, USER: req.user._id})
        

        updates.forEach((update) => product[update] = req.body[update]);
        
        await product.save()
        
        if(!product){
            res.status(400).send()
        }

        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
   
})
router.delete('/productDelete/:id', auth, authRole(ROLE.user), async(req, res) => {
    try {
        const product = await Product.findOneAndDelete({_id: req.params.id, USER: req.user._id}, {$unset:{field: 1}})

        if(!product){
            res.status(400).send()
        }

        res.send(product)
    } catch (e) {
        res.status(500).send()
    }

})

module.exports = router
// {
//     "stringValue": "\"{ USER: new ObjectId(\"6185209956118278b1801870\") }\"",
//     "valueType": "Object",
//     "kind": "ObjectId",
//     "value": {
//         "USER": "6185209956118278b1801870"
//     },
//     "path": "_id",
//     "reason": {},
//     "name": "CastError",
//     "message": "Cast to ObjectId failed for value \"{ USER: new ObjectId(\"6185209956118278b1801870\") }\" (type Object) at path \"_id\" for model \"ProductIn\""
// }