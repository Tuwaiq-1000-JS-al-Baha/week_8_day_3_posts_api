const mongoose = require("mongoose")
const Joi = require("joi")
const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  image: String,
  owner: String,
})

const postJoi = Joi.object({
    title:Joi.string().required(),
    body:Joi.string().required(),
    image:Joi.string().uri().required(),
    owner:Joi.string().required(),
})

const Post = mongoose.model("Post",postSchema)

module.exports.Post=Post
module.exports.postJoi=postJoi

