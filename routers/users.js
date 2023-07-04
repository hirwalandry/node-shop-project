const express = require('express')
const Users= require('../models/Users')
const ROLE = require('../models/role')
const auth = require('../middleware/auth')
const authRole = require('../middleware/userRole')


const router = new express.Router()

router.post('/users', async(req, res) => {
    const users = new Users(req.body)
    try {
        const token = await users.generateAuthToken()
        await users.save()
        res.send({ users, token})
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await Users.findByCredentials(req.body.userName, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send()
    }
})
router.get('/users/me', auth, authRole(ROLE.user), async(req, res) => {
    try {
        
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})
router.post('/users/logoutAll', auth, async(req, res) => {
    try{
       
        req.user.tokens = []
      
        
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }

})
module.exports = router