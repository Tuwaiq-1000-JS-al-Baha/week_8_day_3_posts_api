const express = require("express")
const bodyParser = require("body-parser") 

const posts = require("./routes/posts")

const mongoose = require("mongoose")
require("dotenv").config()

mongoose
  .connect(
    `mongodb+srv://najwa:${process.env.MONGODB_PASSWORD1}@cluster0.hrnbt.mongodb.net/testdb?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log(" Connected to MongoDB")
  })
  .catch(error => {
    console.log("Error connecting to MongoDB", error)
  })

console.log(process.env.MONGODB_PASSWORD1)

const app = express()

app.use(bodyParser.json())

app.use("/api/posts", posts)

app.listen(3000, () => {
  console.log("server is listening on port :" + 3000)
})
