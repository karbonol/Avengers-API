const { Mongoose,Error } = require('mongoose')
const bycrypt = require('bcrypt')
const User = require('./models/User')

const router = require('express').Router()

router.post('/',async (req,res) =>{
    try{    
        if(typeof req.body.password == 'string' ){
            req.body.password = await bycrypt.hash(req.body.password,await bycrypt.genSalt())
        }else{
            return res.status(400).send({message:"Please sent a valid password field as string"})
        }
         const newUser = await User(req.body).save()
    newUser.password = undefined     
    res.send(newUser)
    }catch(err){
        if(err instanceof Error.ValidationError){
            let validationErrorFields = []
            for (const field of Object.keys(err.errors)) {
                validationErrorFields.push(err.errors[field].properties
                    .message.replace(/`/g,'').replace('Path ',''))
            }
            return res.status(400).send({
                validationError : true,
                fields:validationErrorFields
            })
        }
        else
            throw err
    }
})

module.exports = router