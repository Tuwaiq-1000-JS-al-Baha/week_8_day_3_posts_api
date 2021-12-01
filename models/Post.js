const mongoose = require("mongoose")
const Joi = require("joi")

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  owner: String,
  image: {
    type: String,
    default:
      "https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1n",
  },
})
const postJoi = Joi.object({
  title: Joi.string().min(2).max(200).required(),
  body: Joi.string().min(5).max(1000).required(),
  owner: Joi.string().min(5).max(1000).required(),
  image: Joi.string().uri().max(1000),
})
const Post = mongoose.model("Post", postSchema)
module.exports.Post = Post
module.exports.postJoi = postJoi
