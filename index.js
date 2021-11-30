const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const posts = require("./Routes/post")
require("dotenv").config()

mongoose
  .connect(
    `mongodb+srv://MoDuGh28:${process.env.MONGODB_PASSWORD}@cluster0.aabjx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Mongoos is connected")
  })
  .catch(error => {
    console.log("the Error is", error)
  })
const app = express()
app.use(bodyParser.json())
app.use("/api/posts" , posts)

app.listen(3000, () => {
  console.log("server is listening to the port " + 3000)
})
