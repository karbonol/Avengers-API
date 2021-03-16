const router = require('express').Router()
const bycrpt = require('bcrypt')
const token = require('jsonwebtoken')
const User = require('./models/User')
const config = require('./config')

router.post('/',async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({email:email})
    if(!user)
        return res.status(404).send({errMessage: "Invalid credentials"})  
    if (!await bycrpt.compare(password,user.password))
        return res.status(404).send({errMessage: "wrong password"})    
    res.send({
        login:"Success",
        token: token.sign({email:email,username:user.username},config.SECRET_KEY)
    })    
})
module.exports = router