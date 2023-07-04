const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const userSchema = new Schema({
    name: String,
    type: String,
    msg: String
})
const notification = model('notification', userSchema)

module.exports = notification