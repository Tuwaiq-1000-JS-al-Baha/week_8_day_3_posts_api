const mongoose = require("mongoose")
const Joi = require("joi")

const postSchema = new mongoose.Schema({
  title: String,
  body: {
    type: String,
    default: "no body",
  },
  owner: String,
  image: String,
  dateCreated: {
      type: Date,
      default: Date.now,
    },
})

const postJoi = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  body: Joi.string().max(250),
  image: Joi.string().required(),
  owner: Joi.string().required(),
})

const Post = mongoose.model("Post", postSchema)
module.exports.Post = Post
module.exports.postJoi = postJoi