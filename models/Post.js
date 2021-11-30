const mongoose = require("mongoose")
const Joi = require("joi")
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
  title: Joi.string().min(2).max(200).required(),
  body: Joi.string().required(),
  image: Joi.string().required(),
  owner: Joi.string().required(),
})

const Post = mongoose.model("Post", postSchema)

module.exports.Post = Post
module.exports.postJoi = postJoi
