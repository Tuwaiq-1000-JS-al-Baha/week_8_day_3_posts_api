const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const { Post, postJoi } = require("../models/Post")

router.get("/", async (req, res) => {
  const post = await Post.find().limit(50).select("-__v").sort("-dateCreated")

  res.json(post)
})
router.get("/:id" , async (req , res) => {
    const id = req.params.id
    try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json("the id must be object id type")
    const post = await Post.findById(id)
    if (!post) return res.status(404).json("The element not found")
    res.json(post)
    } catch (error) {
        return res.status(500).json(error.message)
    }


})
router.post("/", async (req, res) => {
  try {
    const postBody = req.body
    const result = postJoi.validate(postBody)
    if (result.error) return res.status(400).json(result.error.details[0].message)
    const post = new Post({
      title: postBody.title,
      body: postBody.body,
      image: postBody.image,
      owner: postBody.owner,
    })
    post.save()
    await res.json(post)
  } catch (error) {
    return res.status(500).json(error.message)
  }
})
router.put("/:id" , async (req , res) => {
    const id = req.params.id
    try {
    const {title , body , image , owner} = req.body

    const post = await Post.findByIdAndUpdate(id , {
        $set : {title , body , image , owner} 
    } , 
    {new : true}
    )
    if (!post) return res.status(404).json("The element not found")
    res.json(post)
}  catch (error) {
    return res.status(500).json(error.message)
}

})
router.delete("/:id" , async (req , res) => {
    const id = req.params.id
    try {
    const post = await Post.findById(id)
    if(!post) return res.status(404).json("The Post not found")
    await post.remove()
    res.json("The Post is delete")
    }  catch (error) {
        return res.status(500).json(error.message)
    }
    
})

module.exports = router
