const express = require('express')
const user = require('./user')

const router = new express.Router()

router.post('/insert', async(req, res) => {
    
  
    try {
        await user.save()

        // user.aggregate([{
        //     $project:{ 
        //         "user_ID" : "_id",
        //         "name": {$literal: "names"},
        //         "type":{$literal: "type"},
        //         "msg": {$literal: "msg"}
        //     },
        // },{$out: 'notification'}])
        res.send(user)

    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router