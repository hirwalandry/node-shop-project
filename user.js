const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const userSchema = new Schema({
    user_ID: {
        type: Schema.Types.ObjectId
    },
    name: String,
    type: String,
    msg: String
})
const user = model('uuser', userSchema)

module.exports = user