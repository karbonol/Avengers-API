const express = require('express') 
const logging = require('./middleware/logging')
const functions =  require ('./functionality')
const home = require('./home')
var port =  5000
const app = express()
const cors = require('cors')
const avengersRoutes = require('./avengers')
const authRoute = require('./auth')
const usersRoute = require('./users')
app.use(cors())
app.use(express.json())
//app.use(logging)
const mongoose = require('mongoose')
const enviorement = process.env.HEROKU

if(process.env.PORT)
    port = process.env.PORT  
mongoose.connect(
    enviorement? "mongodb+srv://root:root@cluster0.pxyy1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" :
    "mongodb://localhost/avengersDB"
    ,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
}).catch((err)=>{
    console.log('error has occured when connecting database '+err)
})
app.use('/auth/',authRoute)
app.use('/users/',usersRoute)
app.use('/avengers/',avengersRoutes)
app.use('/',home)
app.listen(port,()=>console.log('server started on '+port))
