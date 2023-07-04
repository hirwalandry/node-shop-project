const Users = require('../models/Users')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'myProject2')
        const user = await Users.findOne({ _id: decoded._id, 'tokens.token' : token})
    
    if(!user){
        throw new Error()
    }
    
    req.token = token
    req.user = user
    next()
    }catch(e){
        res.status(401).send({ error: 'please authenticate'})

    }
 
}


module.exports = auth


