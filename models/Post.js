const Joi = require("joi")
const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  image: String,
  owner: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
})

const postJoi = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  body: Joi.string().min(5).max(100000).required(),
  image: Joi.string().uri(0).required(),
  owner: Joi.string().min(1).max(100).required(),
})

const Post = mongoose.model("Post", postSchema)

module.exports.Post = Post
module.exports.postJoi = postJoi
