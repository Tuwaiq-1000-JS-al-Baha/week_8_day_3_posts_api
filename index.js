const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const posts = require("./routes/posts")
require("dotenv").config()
const app = express()

mongoose
  .connect(
    `mongodb+srv://najmah:${process.env.MONGODB_PASSWORD1}@cluster0.npdui.mongodb.net/testDB?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connecting to MongoDB")
  })
  .catch(error => {
    console.log("Erroe connecting to MongoDB", error)
  })

console.log(process.env.MONGODB_PASSWORD)

app.use(bodyParser.json())

app.use("/api/posts", posts)

app.listen(3000, () => {
  console.log("server is listening on port:" + 3000)
})
