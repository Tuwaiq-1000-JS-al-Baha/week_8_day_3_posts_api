const mongoose = require("mongoose")
const Joi = require("Joi")
const { post } = require("../routers/posts")

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  image: String,
  owner: String,
})

const postJoi = Joi.object({
  title: Joi.string().min(2).max(200).required(),
  body: Joi.string().min(5).max(1000),
  image: Joi.string().min(0).required(),
  owner: Joi.string().min(0).required(),
})

const Post = mongoose.model("Post", postSchema)
module.exports.Post = Post
module.exports.postJoi = postJoi
