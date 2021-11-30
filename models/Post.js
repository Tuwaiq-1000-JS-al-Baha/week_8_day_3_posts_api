const mongoose = require("mongoose")
const Joi = require("Joi")

const postSchema = new mongoose.Schema({
  title: String,
  body: {
    type: String,
    default: "did't have body",
  },
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  owner: String,
})
const postJoi = Joi.object({
  title: Joi.string().required().min(2).max(200),
  body: Joi.string().min(5).max(5000),
  image: Joi.string().uri().max(90000),
  owner: Joi.string().required(),
})

const Post = mongoose.model("Post", postSchema)

module.exports.Post = Post
module.exports.postJoi = postJoi
