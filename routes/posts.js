const express = require("express")
const Joi = require("joi")
const router = express.Router()
const { Post, postJoi } = require("../models/Post")
const mongoose = require("mongoose")

router.get("/", async (req, res) => {
  const posts = await Post.find().select("-__v").limit(50).sort("-dateCreated")

  res.json(posts)
})
////////////////////////////////////////////Get/////////////////////////////////////////////
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("post id should be a valid object id ")
    }
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json("post not found")
    }
    res.json(post)
  } catch (error) {
    return res.status(500).json("Internal error")
  }
})
////////////////////////////////////////////Post/////////////////////////////////////////////

router.post("/:id", async (req, res) => {
  const Postbody = req.body

  const result = postJoi.validate(Postbody)

  if (result.error) {
    return res.status(400).json(result.error.details[0].message)
  }
  const post = new Post({
    title: Postbody.title,
    body: Postbody.body,
    image: Postbody.image,
    owner: Postbody.owner,
  })
  try {
    await post.save()
  } catch (error) {
    return res.json(error)
  }
  res.json(post)
})
////////////////////////////////////////////Put/////////////////////////////////////////////

router.put("/:id", async (req, res) => {
  const id = req.params.id
  const { title, body, image, owner } = req.body

  const post = await Post.findByIdAndUpdate(
    id,
    {
      $set: { title, body, image, owner },
    },
    { new: true }
  )
  if (!post) return res.status(404).json("post not found")

  res.json(post)
})
////////////////////////////////////////////Delete/////////////////////////////////////////////

router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) return res.status(404).json("post not found")
  await post.remove()
  res.json("post removed")
})

module.exports = router
