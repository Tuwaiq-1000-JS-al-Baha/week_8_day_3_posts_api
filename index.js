const express = require("express")
const bodyParser = require("body-parser")
const posts = require("./routers/posts")
const mongoose = require("mongoose")
require("dotenv").config()

mongoose
  .connect(`mongodb+srv://salwaq:${process.env.MONGODB_PASSWORD}@cluster0.drzai.mongodb.net/test1`)
  .then(() => console.log("Connected to MongooDB"))
  .catch(error => console.log("Error connecting to MongoDB", error))
console.log(process.env.MONGODB_PASSWORD)

const app = express()

app.use(bodyParser.json())
app.use("/api/posts", posts)

app.listen(3002, () => {
  console.log("server is listening on port :" + 3002)
})
