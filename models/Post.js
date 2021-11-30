const mongoose=require("mongoose")
const Joi=require("joi")
const postSchema=new mongoose.Schema({
    title:String,
    body:{
 type:String,
 default:"no body"
    },
    image:String,
    owner:String,
    dataCreated:{
        type:Date,
        default:Date.now,
    },
})
const postJoi= Joi.object({
    title:Joi.string().min(2).max(300).required(),
    body:Joi.string().min(5).max(2000),
    image:Joi.string().uri().required(),
    owner:Joi.string().min(1).max(100).required()
})
const Post=mongoose.model("Post",postSchema)
module.exports.Post =Post
module.exports.postJoi=postJoi
