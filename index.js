const express = require("express")
const bodyParser = require("body-parser")
const posts = require("./router/posts")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()
mongoose
  .connect(
    `mongodb+srv://Reem1420:${process.env.MONGODB_PASSWORD}@cluster0.vsjzx.mongodb.net/test1?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch(error => {
    console.log("Error connecting to MongoDB ", error)
  })
app.use(bodyParser.json())
app.use("/api/posts", posts)
app.listen(3000, () => {
  console.log("server is listening on port:" + 3000)
})
