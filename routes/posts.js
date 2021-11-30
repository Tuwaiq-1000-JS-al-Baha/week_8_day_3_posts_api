const express = require("express");
const router = express.Router();
const { Post, postJoi } = require("../models/Post");
const mongoose = require("mongoose");

//get
router.get("/", async (req, res) => {
  const posts = await Post.find().select("-__v").limit(50);
  res.json(posts);
});

//get by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("post id should be avalid object id");
    }
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json("post not found");
    }
    res.json(post);
  } catch (error) {
    return res.status(500).json("internal error");
  }
});

//post
router.post("/", async (req, res) => {
  const postBody = req.body;

  const result = postJoi.validate(postBody);

  if (result.error) {
    return res.status(400).json(result.error.details[0].message);
  }

  const post = new Post({
    title: postBody.title,
    body: postBody.body,
    image: postBody.image,
    owner: postBody.owner,
  });
  try {
    await post.save();
  } catch (error) {
    return res.json(error);
  }

  res.json(post);
});

//put
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { title,body,image,owner } = req.body;

  const product = await Post.findByIdAndUpdate(
    id,
    {
      $set: { title,body,image,owner },
    },
    { new: true }
  );
  if (!product) return res.status(404).json("product not found");

  res.json(product);
});

//delete
router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json("post not found");
  await post.remove();
  res.json("post remove");
});
module.exports = router;
