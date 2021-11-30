const { timeStamp } = require("console")
const Joi = require("joi")
const { url } = require("inspector")
const mongoose = require("mongoose")
const { string } = require("joi")
const { post } = require("got")

const postSchema = new mongoose.Schema ({
    title : String ,
    body : String , 
    image : {
       type : String ,
       default : "https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png"
    } , 
    owner : String ,
    dateCreated :{
        type : Date , 
        default : Date.now,
    }  
})
const postJoi = Joi.object({
    title:Joi.string().min(2).max(30).required(),
    body:Joi.string().min(5).max(1000).required(),
    image:Joi.string().min(2).max(100),
    owner:Joi.string().min(2).max(30),

})

const Post = mongoose.model("posts" , postSchema)
module.exports.postJoi = postJoi
module.exports.Post = Post