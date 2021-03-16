const moongoose = require('mongoose')
const roles = {
    admin:2,
    normal:1
}
const schema = moongoose.Schema({
    username:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        enum:Object.values(roles),
        default:roles.normal
    }
    
})
const userModel = moongoose.model("User",schema)
schema.path("email").validate(async function(value){
    let count = await userModel.countDocuments({email:value})
    return (count == 0)
},"email already existing")
module.exports = userModel