const express = require('express')
require('./db/mongoose')
const usersRouter = require('./routers/users')
const productRouter = require('./routers/product')
const productInRouter = require('./routers/poductin')
const productOutRouter = require('./routers/productout')
const userRouter = require('./userIn')
const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use((req, res, next) => {res.header("Access-Control-Allow-headers", "Accept, Accept-Language, Content-Language, Content-Type"); 
                             res.header("Access-Control-Allow-Origin", "*"); next();})
app.use(usersRouter)
app.use(productRouter)
// app.use(productInRouter)
app.use(productOutRouter)
app.use(userRouter)
app.listen(port, () => {
    console.log('port is on 3001')
})
// const user = require('./models/Users')
// const productOut = require('./models/productOut')

// const main = async() => {
//     const users = await user.findById('61877578106bc5494fb48120')
//         await users.populate({
//             path: 'prosOut',
//            populate:{
//             path: 'USER', 
//             model: 'users'
//         },})
//         console.log(users.prosOut)
// }
// main()