const express = require('express')
const Avenger = require('./models/Avenger')
const User =  require('./models/User')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('./config')
var avengers = [
    {id:1,name:'Iron man'},
    {id:2,name:'Captain America'},
    {id:3,name:'Thor'}
]
router.use(async (req,res,next)=>{
    const token = req.headers.token
    if (!token)
        return res.status(401).send({message:"Invalid token sent!"}) 
    try{
        jwt.verify(token,config.SECRET_KEY)
    }catch(e){
        return res.status(401).send({message:"Invalid token sent!"}) 
    }
    const authUser = await User.findOne({email:jwt.decode(token).email}) 
    if(authUser)
        return next()
    else
        res.status(401).send({message:"Unauthorized user"})
})
router.get('/',async (req,res)=>{
    res.send(await Avenger.find())
})
router.get("/:id",async (req,res)=>{
    const foundAvenger = await Avenger.findById(req.params.id)
    console.log(foundAvenger)
    if(!foundAvenger)
        return res.status(404).send("cannot find avenger")
    res.send(foundAvenger)    
})
router.put("/:id",async (req,res)=>{
    let updatingAvenger 
    try {
        updatingAvenger= await Avenger.findById(req.params.id)    
    } catch (error) {
        return badRequest(res,"Please enter a valid ID!")
    }
    
    if(!updatingAvenger){
        return res.status(404).send("cannot find avenger")
    }else{
        let updatingParams = {}
        for(key in req.body){
            updatingParams[key] = req.body[key]
        }
        if(updatingParams.likeCount && Object.keys(updatingParams).length == 1){
            updatingParams.likeCount = updatingAvenger.likeCount + 1
            updatingAvenger.set(updatingParams)
            updatingAvenger.save()
            return res.send(updatingParams)
        }
        updatingAvenger.set(updatingParams)
        try {
            updatingAvenger.save()
            return res.send(updatingAvenger)    
        } catch (error) {
            return badRequest(res,err)
        }     
    }
})
function mapRequestBodyToSchema(req){
    var obj = {}
    for(key in req.body){
        obj[key] = req.body[key]
    }
    return new Avenger(obj)
}
function badRequest(res,msg){
    return res.send({error:true,msg:msg})
}
router.post('/',async (req,res)=>{
    const newAvenger = mapRequestBodyToSchema(req)
    try {
        res.send(await newAvenger.save())
    } catch (error) {
        return badRequest(res,error)
    }  
})
router.delete('/',async (req,res)=>{
    try {
        res.send(await Avenger.deleteMany())
    } catch (error) {
        res.status(500).send('An error occured when deleting all..'+error)
    }
    
})
router.delete('/:id',async(req,res)=>{
    let deletingAvenger 
    try {
        deletingAvenger= await Avenger.findByIdAndDelete(req.params.id)    
    } catch (error) {
        return badRequest(res,"Please enter a valid ID!")
    }
    if(!deletingAvenger)
        return res.status(404).send('avenger not found!')
    res.send(deletingAvenger)
    
})
module.exports = router