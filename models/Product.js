const mongoose = require('mongoose')
const Schema  = mongoose.Schema
const model = mongoose.model



const productsSchema = new Schema({
    productName: {
        type: String,
        trim: true,
        required: true
    },
    dateIn: {
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
        trim: true,
        required: true
    },
    USER: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
})
productsSchema.virtual('prosOut', {
    ref: 'ProductOut',
    localField: '_id',
    foreignField: 'productName'
})
const Product = model('Product', productsSchema)
const ProductIn = model('ProductIn', productsSchema)
module.exports = {
    Product,
    ProductIn
}