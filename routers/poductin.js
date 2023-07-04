const express = require('express')
const productIn = require('../models/Product')
const auth = require('../middleware/auth')
const authRole  = require('../middleware/userRole')
const ROLE = require('../models/role')

const router = new express.Router()

router.get('/reportIn', auth, authRole(ROLE.user), async(req, res) => {
    try {
        await productIn.find({ USER: req.user._id})
        await req.user.populate({
            path: 'prosOut',
        populate:{
            path: 'productName',
            select: 'productName',   
            populate: {
                path: 'USER',
                select: 'userName'
            },
        },
    })
        res.send(req.user.prosOut)
    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router

