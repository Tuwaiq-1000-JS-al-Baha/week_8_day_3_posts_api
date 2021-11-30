const express = require("express")
const bodyParser = require("body-parser")
const posts = require("./routes/posts")
const Joi = require("joi")
require("dotenv").config()

const mongoose = require("mongoose")

mongoose
  .connect(
    `mongodb+srv://abeer5011:${process.env.MONGODB_PASSWORD}@cluster0.we5sj.mongodb.net/testDB?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connected to mongoDB")
  })
  .catch(error => console.log("error connecting to mongoDB", error))
const app = express()
app.use(bodyParser.json())

app.use("/api/posts", posts)

app.listen(3000, () => {
  console.log("Server is listening on port: " + 3000)
})
