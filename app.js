const express = require('express') 
const logging = require('./middleware/logging')
const functions =  require ('./functionality')
const home = require('./home')
const port = process.env.port || 5000
const app = express()
const cors = require('cors')
const avengersRoutes = require('./avengers')
const usersRoute = require('./users')
app.use(cors())
app.use(express.json())
//app.use(logging)
const mongoose = require('mongoose')
const enviorement = process.env.NODE_ENV
mongoose.connect(
    enviorement == 'development'?"mongodb://localhost/avengersDB"
    :"mongodb+srv://root:root@cluster0.pxyy1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    ,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('database connected')
}).catch((err)=>{
    console.log('error has occured when connecting database '+err)
})

app.use('/avengers/',avengersRoutes)
app.use('/users/',usersRoute)
app.use('/',home)
app.listen(port,()=>console.log('server started on '+port))
