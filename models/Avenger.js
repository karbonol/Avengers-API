const mongoose = require('mongoose')
const movieList = ['avengers','endgame','iron man 2','first avenger','incredible hulk']
const avengerSchema = mongoose.Schema({
    //_id:mongoose.SchemaTypes.ObjectId,
    name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    birthName:String,
    movies:{
        type:[String],
        enum:movieList,
    },
    imageUrl:String,
    likeCount:{
        type:Number,
        default:0
    },
    deceased:{
        type:Boolean,
        default:false
    }
})
const Avenger =  mongoose.model('Avenger',avengerSchema)
module.exports = Avenger