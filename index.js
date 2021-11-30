const express = require("express")
const bodyParser = require("body-parser")
const posts = require("./routes/posts")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()
mongoose
  .connect(
    `mongodb+srv://Ghadah:${process.env.MONGODB_PASSWORD}@cluster0.nmjrq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MangoDB")
  })
  .catch(error => {
    console.log("Error connecting to MongoDB", error)
  })
console.log(process.env.MONGODB_PASSWORD)
app.use(bodyParser.json())
app.use("/api/posts", posts)
app.listen(3000, () => {
  console.log("server is listenin on port:" + 3000)
})
