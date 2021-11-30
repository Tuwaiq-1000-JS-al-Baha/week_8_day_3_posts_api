const mongoose = require("mongoose")
const Joi = require("joi")

const postSchema = new mongoose.Schema({
  title: String,
  body: {
    type: String,
    default: "no body",
  },
  image: String,
  owner: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
})

const postJoi = Joi.object({
  title: Joi.string().required(),
  body: Joi.string(),
  image: Joi.string().required(),
  owner: Joi.string().required(),
})

const Post = mongoose.model("Post", postSchema)
module.exports.Post = Post
module.exports.postJoi = postJoi
