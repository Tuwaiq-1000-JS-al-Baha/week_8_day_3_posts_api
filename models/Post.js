const mongoose = require("mongoose")
const Joi = require("joi")

const postSchema = mongoose.Schema({
    title : String ,
    body : {
        type : String ,
        default : "no body"
    } ,
    image : String ,
    owner : String ,
    dateCreated : {
        type : Date ,
        default : Date.now()
    }
})

const postJoi = Joi.object({
    title : Joi.string().min(1).max(200).required() ,
    body : Joi.string().min(5).max(3000).required() ,
    image : Joi.string().uri().max(100000).required() ,
    owner : Joi.string().min(1).max(50).required()
})

const Post = mongoose.model("Post" , postSchema)

module.exports.Post = Post
module.exports.postJoi = postJoi
