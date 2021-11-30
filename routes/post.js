const express = require("express")
const router = express.Router()
const { Post, postJoi } = require("../models/Post")
const mongoose = require("mongoose")
const { message } = require("statuses")

router.get("/", async (req, res) => {
  const posts = await Post.find().select("-__v").limit(20).sort("title")
  res.json(posts)
})

router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json("post id should be a valid object id")
    }
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json("post not found")
    }
    res.json(post)
  } catch (error) {
    return res.status(500).json("internal error")
  }
})

router.post("/", async (req, res) => {
  const postBody = req.body
  const result = postJoi.validate(postBody)

  if (result.error) {
    return res.status(400).json(result.error.details[0], message)
  }

  const post = new Post({
    title: postBody.title,
    body: postBody.body,
    image: postBody.image,
    owner: postBody.owner,
  })

  try {
    await post.save()
  } catch (error) {
    return res.status(500).json("internal error")
  }
  res.json(post)
})

router.put("/:id" , async (req , res) => {
    const { title , body , image , owner } = req.body

    const post = await Post.findByIdAndUpdate (req.params.id , {
        $set: { title, body , image , owner },
    },
     { new: true }
    )

    if (!post) return res.status(404).json(" post not found")

    res.json(post)
})

router.delete("/:id" , async (req , res ) => {
    const post = await Post.findById(req.params.id)

    if(!post) return res.status(404).json(" post not found ")
    await post.remove()
    res.json("post removed")
})

module.exports = router