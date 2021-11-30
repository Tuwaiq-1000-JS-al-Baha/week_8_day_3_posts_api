const express = require("express")
const  mongoose  = require("mongoose")
const router = express.Router()
const { Post , postJoi } = require("../modules/Post")


// get all posts
router.get("/" , async (req , res )=> {
    const posts = await Post.find()

    res.json(posts)
})
// grt post by id 
router.get("/:id" , async (req , res) => {
    try {
        const id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json("valid is id")
        }
        const post = await Post.findById(id)
        if(!post){
           return res.status(404).json("post is not defind")
        }
        res.json(post)
    } catch(error){
        return res.status(500).json("internal error")
    }
})

//create posts
router.post("/" , async (req , res)=> {
    const postBody = req.body
    const result = postJoi.validate(postBody)

    if(result.error){
        return res.status(400).json(result.error.details[0].message)
    }
    const newPost = new Post ({
        title : postBody.title , 
        body : postBody.body ,
        image: postBody.image ,
        owner : postBody.owner
    })
    try {
        await newPost.save()

    } catch(error) {
        return res.status(500).json("internal error")
    }
    res.json(newPost)
})
//edit post
router.put("/:id" , async (req , res ) => {
    const id = req.params.id
    const postBody = req.body

    const post = await Post.findByIdAndUpdate(id , {
        $set: {
        title : postBody.title , 
        body : postBody.body ,
        image : postBody.image , 
        owner:postBody.owner
        }} , 
        {new : true} , 
    )
    if(!post)
    return res.status(404).json("post not found")

    res.json("product is upadted")
})

//delete
router.delete("/:id" , async (req , res ) => {
    const id = req.params.id
    const post = await Post.findById(id)

    if(!post)
    return res.status(404).json("post is not found ")
    await post.remove()

    res.json("post removed")
})
module.exports = router;