const mongoose = require("mongoose")
const Joi = require("joi")
const { string } = require("joi")

// mongoose schema
const postSchema = new mongoose.Schema({
  title: String,
  owner: String,
  body: String,
  image: String,
  dateCrated: {
    type: Date,
    default: Date.now,
  },
})

// joi validate
const postJoi = Joi.object({
  title: string().min(4).max(200).required(),
  owner: string().max(100).required(),
  body: string().min(5).required(),
  image: string().uri().required(),
})

const Post = mongoose.model("Post", postSchema)

module.exports.Post = Post
module.exports.postJoi = postJoi
