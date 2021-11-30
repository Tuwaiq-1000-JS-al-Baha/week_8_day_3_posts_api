const { url } = require("inspector")
const Joi = require("joi")
const mongoose = require("mongoose")

const postsSchema = new mongoose.Schema ({
    title: String,
    body: String,
    image: String,
    owner: String,
})

const postJoi = Joi.object ( {
    title:Joi.string().min(5).max(20).required(),
    body:Joi.string().min(5).max(100).required(),
    image:Joi.string().uri().required(),
    owner:Joi.string().min(2).max(20).required(),
})

const Post = mongoose.model("Post" , postsSchema)
module.exports.Post = Post
module.exports.postJoi = postJoi