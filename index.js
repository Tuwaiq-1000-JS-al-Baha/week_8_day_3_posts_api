const bodyParser = require("body-parser")
const express = require("express")
const posts = require("./routes/posts")

const mongoose = require("mongoose")
require("dotenv").config()

mongoose
  .connect(
    `mongodb+srv://sarah-ali-99:${process.env.MONGODB_PASSWORD}@cluster0.jvxzo.mongodb.net/test?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to mangoDB")
  })
  .catch(error => {
    console.log("Error connecting to MangoDB", error)
  })
const app = express()

app.use(bodyParser.json())
app.use("/api/posts", posts)

app.listen(3000, () => {
  console.log("server is listening on port" + 300)
})
