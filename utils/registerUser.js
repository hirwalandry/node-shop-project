const Users = require('../models/Users')

const registerUser = async(registerDets, role, res) => {
    const users = new Users({
        ...registerDets,
        role
    })
    try {
        const token = await users.generateAuthToken()
        await users.save()
        res.send({ users, token})
    } catch (e) {
        res.status(400).send()
    }
}
module.exports = registerUser
