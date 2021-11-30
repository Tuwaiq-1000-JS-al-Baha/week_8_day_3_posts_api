const postJoi =Joi.object({

    title:Joi.string().min(2).max(200).required(),
    body:Joi.string().min(5).max(1000).required(),
    image:Joi.string().min(0).required(),
    owner:Joi.string().min(2).max(200).required(),
  })
  const Post = mangoose.model("Post", postchema)
  module.exports.Post = Post
  module.exports.postJoi=postJoi