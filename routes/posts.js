const express = require("express")

const mongoose = require("mongoose")

const router = express.Router()
const { Post, postJoi } = require("../models/Post")
// let post
router.get("/", async (req, res) => {
  const posts = await Post.find().select("-__v").limit(50).sort("-dateCearted")
  res.json(posts)
})
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("post id should be a valid object id")
    }
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json("post not found")
    }
    res.json(post)
  } catch (error) {
    return res.status(500).json("Internal error", error)
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
    image: postBody.image,
    owner: postBody.owner,
  })
  try {
    await post.save()
  } catch (error) {
    return res.status(500).json(error)
  }
  res.json(post)
})

router.put("/:id", async (req, res) => {
  const id = req.params.id
  //   const postBody = req.body
  const { title, body, image, owner } = req.body
  const post = await Post.findByIdAndUpdate(
    id,
    {
      // $set: { title: postBody, description: postBody, price: postBody },
      $set: { title, body, image, owner },
    },
    { new: true }
  )
  //   Post.updateOne({ _id: id }, { $set: { title: postBody, description: postBody, price: postBody } })
  //   res.json("post update")
  if (!post) {
    return res.status(404).json("post not found")
  }
  res.json(post)
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id
  const post = await Post.findById(id)

  if (!post) return res.status(404).json("post not found")
  await post.remove()
  res.json("post removed")
})

module.exports = router
