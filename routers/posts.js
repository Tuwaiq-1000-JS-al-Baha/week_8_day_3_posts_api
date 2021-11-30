const express = require("express")
const routers = express.Router()
const mongoose = require("mongoose")
const { Post, postJoi } = require("../models/Post")

// let posts = [
//   {
//     title: "funny day",
//     body: "i love sunny day",
//     image: "https://image.com/12345.png",
//     owner: "Rana",
//   },
//   {
//     title: "crazy",
//     body: "alweys do some thing crazy",
//     image: "https://image.com/12345.png",
//     owner: "fahd",
//   },
//   {
//     title: "game",
//     body: "game is futuer",
//     image: "https://image.com/12345.png",
//     owner: "bader",
//   },
//   {
//     title: "food",
//     body: "eat for helth",
//     image: "https://image.com/12345.png",
//     owner: "lama",
//   },
// ]

routers.get("/", async (req, res) => {
  const posts = await Post.find().select("- __v").limit(50).sort("-dateCreated")
  res.json(posts)
})

routers.get("/:id", async (req, res) => {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("post id should be valid object")
    }
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json("post not found")
    }
    res.json(product)
  } catch (error) {
    return res.status(500).json("intrenal error")
  }
})

routers.post("/", async (req, res) => {
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
    return res.json(error)
  }
  res.json(post)
})

routers.put("/:id", async (req, res) => {
  const id = req.params.id
  const { title, body, image, owner } = req.body

  const post = await Post.findByIdAndUpdate(id, {
    $set: { title, body, image, owner },
  })
  if (!post) return res.status(404).json("post not found")
  res.json(post)
})

routers.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) return res.status(404).json("post not found")
  await post.remove()
  res.json("post removed")
})

module.exports = routers
