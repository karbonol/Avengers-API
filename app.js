const express = require('express') 
const logging = require('./middleware/logging')
const functions =  require ('./functionality')
const home = require('./home')
const port = 5000//process.env.port || 3000
const app = express()
const cors = require('cors')
const avengersRoutes = require('./avengers')

app.use(cors())
app.use(express.json())
//app.use(logging)
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/avengersDB",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('database connected')
}).catch((err)=>{
    console.log('error has occured when connecting database '+err)
})

app.use('/avengers/',avengersRoutes)
app.use('/',home)
app.listen(port,()=>console.log('server started on '+port))
