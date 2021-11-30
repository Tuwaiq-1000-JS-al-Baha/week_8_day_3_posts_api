const mongoose = require("mongoose")
const Joi = require("joi")
const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  image: Number,
  owner: String,
})

const postJoi = Joi.object({
  title: Joi.string().min(10).max(100).required(),
  body: Joi.string().min(10).max(2000).required(),
  image: Joi.string().uri().required(),
  owner: Joi.string().min(5).max(20).required(),
})
const Post = mongoose.model("Post", postSchema)

module.exports.Post = Post
module.exports.postJoi = postJoi
