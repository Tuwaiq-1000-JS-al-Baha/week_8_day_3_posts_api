const express = require("express")
const bodyParser = require("body-parser")

const posts = require("./routes/posts")

const mongoose = require("mongoose")
require("dotenv").config()

mongoose
  .connect(`mongodb+srv://Latifah000:${process.env.MONGODB_PASSWORD}@cluster0.ahz0n.mongodb.net/testDB`)
  .then(() => {
    console.log("connected MongoDB")
  })
  .catch(error => console.log("Error connected to MongoDB", error))
const app = express()
app.use(bodyParser.json())

app.use("/api/posts", posts)

app.listen(3000, () => {
  console.log("server is listening on port: " + 3000)
})
