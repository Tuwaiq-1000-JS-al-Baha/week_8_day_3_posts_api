const mongoose = require("mongoose")
const Joi = require("joi")
const postsSchema = new mongoose.Schema({
  title: String,
  owner: String,
  image: String,
  body: {
    type: String,
    default: "no descrption",
  },
  deteCreated: {
    type: Date,
    default: Date.now,
  },
})
const PostJoi = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  owner: Joi.string().min(2).required(),
  image: Joi.string().required(),
  body: Joi.string().min(5).max(200),
})

const Post = mongoose.model("Post", postsSchema)
module.exports.Post = Post
module.exports.PostJoi = PostJoi
