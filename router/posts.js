const express = require("express")

const router = express.Router()

const { Post, PostJoi } = require("../models/Post")
const mongoose = require("mongoose")
//get all----------------------------------------
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().select("-__v").limit(12).sort("-deteCreated")
    res.json(posts)
  } catch (reeor) {
    return res.status(500).json(error.message)
  }
})
//get one post ------------------------------
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json("posts id should be a valid object id ")
    }
    const posts = await Post.findById(req.params.id)
    if (!posts) {
      return res.status(404).json("posts not found ")
    }
    res.json(posts)
  } catch (error) {
    return res.status(500).json(error.message)
  }
})
//post------------------------------------------------
router.post("/", async (req, res) => {
  const postsbody = req.body
  const { title, body, image, owner } = postsbody
  const result = PostJoi.validate(postsbody)
  if (result.error) {
    return res.status(400).json(result.error.details[0].message)
  }
  const posts = new Post({
    title,
    body,
    owner,
    image,
  })
  try {
    await posts.save()
    res.json(posts)
  } catch (error) {
    return res.json(error)
  }
})
//put-----------------------------------------------------
router.put("/:id", async (req, res) => {
  const { title, body, owner, image } = req.body
  try {
    const posts = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: { title, body, owner, image },
      },
      { new: true }
    )
    if (!posts) return res.status(404).json("posts not found")
    res.json(posts)
  } catch (error) {
    return res.status(500).json(error.message)
  }
})
//delete----------------------------------------------------
router.delete("/:id", async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id)
    if (!posts) return res.status(404).json("posts not found ")
    await posts.remove()
    res.json("posts removed")
  } catch (error) {
    return res.status(500).json(error.message)
  }
})
module.exports = router
