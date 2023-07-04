require("./auth")
const db = require('../db/mongoose')
const Users = require('../models/Users')

const authRole = (roles = []) => {
    if(typeof roles === 'string'){
        roles = [roles]
    }
     try {
       return [(req, res, next) => {
           if(roles.length && !roles.includes(req.user.role)){
        return res.status(401).send({ error: 'please authorize'})
    }else{
                next()
            }
        }]
    } catch (error) {
         res.status(401).send({ error: 'please authorize'})
    }

    
   
} 
module.exports = authRole
