const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const { Post, postJoi } = require("../models/Post")

// get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().sort("-dateCrated")
  res.json(posts)
})

// get one post
router.get("/:id", async (req, res) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json("Id shoud be an id object type")
  }
  const post = await Post.findById(id)
  if (!post) {
    return res.status(404).json("post not found")
  }
  res.json(post)
})

// add post
router.post("/", async (req, res) => {
  const postBody = req.body

  const result = postJoi.validate(postBody)
  if (result.error) {
    return res.status(400).json(result.error.details[0].message)
  }
  const post = new Post({
    title: postBody.title,
    body: postBody.body,
    owner: postBody.owner,
    image: postBody.image,
  })
  try {
    await post.save()
  } catch (error) {
    return res.status(500).json("Internal error")
  }
  res.json("added")
})

// edit post
router.put("/:id", async (req, res) => {
  const id = req.params.id
  const { title, body, owner, image } = req.body
  const post = await Post.findByIdAndUpdate(
    id,
    {
      $set: { title, body, owner, image },
    },
    {
      new: true,
    }
  )
  if (!post) return res.status(404).json("post not found")
  res.json(post)
})

module.exports = router
