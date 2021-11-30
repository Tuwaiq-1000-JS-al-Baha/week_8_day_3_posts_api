const mongoose = require("mongoose");
const joi = require("joi");

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  image: String,
  owner:String,
  
});

const postJoi = joi.object({
  title: joi.string().min(2).max(200).required(),
  body: joi.string().min(5).max(2000).required(),
  image: joi.string().required(),
  owner: joi.string().min(2).max(20).required(),

});

const Post = mongoose.model("Post", postSchema);

module.exports.postJoi = postJoi;
module.exports.Post = Post;
