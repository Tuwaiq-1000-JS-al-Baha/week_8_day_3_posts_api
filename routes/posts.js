const express = require("express")
const router = express.Router()
const { Post, postJoi } = require("../models/Post")
const mongoose = require("mongoose")

router.get("/", async (req, res) => {
  const posts = await Post.find().select("-__v").limit("50").sort("-dateCreated")

  res.json(posts)
})
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("post id should be a valid obj")
    }
    const post = await post.findById(id)
    if (!post) {
      return res.status(404).json("post not found")
    }
    res.json(post)
  } catch (error) {
    return res.status(500).json("post error")
  }
})
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
    image: postBody.string,
  })
  try {
    await post.save()
  } catch (error) {
    return res.status(500).json("Internal error")
  }

  res.json(post)
})
router.put("/:id", async (req, res) => {
  const id = req.params.id
  const { title, body, owner, image } = req.body

  const post = await Post.findByIdAndUpdate(
    id,
    {
      $set: { title, body, owner, image },
    },
    { new: true }
  )
  if (!post) return res.status(400).json("post not found")
  res.json(post)
})
router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) return res.status(400).json("post not found")
  await post.remove()
  res.json("post removed")
})

module.exports = router
