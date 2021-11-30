const express = require("express")
const bodyParser = require("body-parser")
const posts = require("./routes/posts")
const mongoose = require("mongoose")
require ("dotenv").config()
const joi = require("joi")

const app = express()

app.use(bodyParser.json())

app.use("/api/posts", posts)

// console.log(process.env.MONGODB_PASSWORD)
mongoose.connect(
  `mongodb+srv://x:${process.env.MONGODB_PASSWORD}@cluster0.f0wz6.mongodb.net/PostsDB?authSource=admin&replicaSet=atlas-rzbbpe-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`
  )
  .then(()=>{
    console.log("connected to MongoDB")
  })
  .catch(error =>{
    console.log("Error connecting to MongoDB")
  })
  app.listen(3000, () => {
    console.log("post app listening at http://localhost:" + 3000)
  })