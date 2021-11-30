const express = require("express")
const router = express.Router()
const { Post, postJoi } = require("../models/Post")
const mongoose = require("mongoose")

router.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json("post id should a valid object id")
    const post = await Post.findById(id)
    if (!post) return res.status(404).json("post not found")
    res.json(post)
  } catch (error) {
    return res.status(500).json(error.message)
  }
})

router.get("/", async (req, res) => {
  const posts = await Post.find().sort("-dateCreated").select("-__v")
  res.json(posts)
})

router.post("/", async (req, res) => {
  const postBody = req.body
  const { title, body, image, owner } = postBody

  const result = postJoi.validate(postBody)
  if (result.error) return res.status(400).json(result.error.details[0].message)

  const post = new Post({
    title,
    body,
    image,
    owner,
  })
  try {
    await post.save()
    res.json(post)
  } catch (error) {
    return res.status(500).json(error.message)
  }
})

router.put("/:id", async (req, res) => {
  const id = req.params.id
  const { title, body, image, owner } = req.body
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $set: { title, body, image, owner },
      },
      { new: true }
    )
    if (!post) return res.status(404).json("post not found")

    res.json(post)
  } catch (error) {
    return res.status(500).json(error.message)
  }
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json("post id should a valid object id")
    const post = await Post.findById(id)
    if (!post) return res.status(404).json("post not found")
    await post.remove()
    res.json("post is deleted successfully")
  } catch (error) {
    return res.status(500).json(error.message)
  }
})

module.exports = router
