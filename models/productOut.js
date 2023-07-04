const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const productOutSchema = new Schema({
    productName: {
        type: String,
        required: true,
        
    },
    dateOut: {
        type: Date,
        default: Date.now
    },
    quantity: {
        type: Number,
        trim: true,
        required: true
    },
    price_$_: {
        type: String,
        default:'100',
        required: true
    },
    USER: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
})

const productsOut = model('ProductOut', productOutSchema)

module.exports = productsOut