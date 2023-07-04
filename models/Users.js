const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ROLE = require('./role')
const Schema = mongoose.Schema
const model = mongoose.model


const UsersSchema = new Schema({
    userName: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        minlength: 8
    },
    role:{
        type: String,
        default: ROLE.user,
        
    },
    tokens: [{
        token: {
            type: String,
            required: true
            
        }
    }]
    
}, {
    toJSON:{ virtuals: true },
    toObject:{ virtuals: true }
})
UsersSchema.virtual('prosOut', {
    ref: 'ProductOut',
    localField: '_id',
    foreignField: 'USER'
})
UsersSchema.virtual('prosIn', {
    ref: 'ProductIn',
    localField: '_id',
    foreignField: 'USER'
})
UsersSchema.virtual('pros', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'USER'
})
// give user security to own his data
UsersSchema.methods.generateAuthToken = async function(){
    const user = this

    const token = await jwt.sign({_id: user._id.toString(), role: user.role}, 'myProject2')
    user.tokens = user.tokens.concat({ token })
    await user.save()


    return token

}
//making login limitation
UsersSchema.statics.findByCredentials = async (userName, password) => {
    const user = await Users.findOne({ userName })
    if(!user){
        throw new Error('unable to login')

    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('unable to login')
    }

    return user
}

// hash pasd before saving to the database
UsersSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)

    }
     
     
   next()
})
const Users = model('users', UsersSchema)

module.exports = Users