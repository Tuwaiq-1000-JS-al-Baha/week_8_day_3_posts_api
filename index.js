const express = require("express")
const bodyParser = require("body-parser")
const posts = require("./routes/posts")
const mongoose = require("mongoose")
require("dotenv").config()
mongoose
  .connect(`mongodb+srv://Abdulathim:${process.env.MONGODB_PASSWORD1}@cluster0.asekp.mongodb.net/testDB`)
  .then(() => {
    console.log("connect to MongoDB")
  })
  .catch(error => {
    console.log("error connecting to MongoDB", error)
  })

const app = express()

app.use(bodyParser.json())

app.use("/api/posts", posts)

app.listen(3000, () => {
  console.log("server is listening on port :" + 3000)
})
