const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
require("dotenv").config()
const posts = require("./routes/posts")

const app = express()
app.use(bodyParser.json())

mongoose
  .connect(
    `mongodb+srv://amjadill:${process.env.MONGODB_PASSWORD}@cluster0.j6bza.mongodb.net/amjadFirstDB?retryWrites=true&w=majority`
  )
  .then(() => console.log("connected to database"))
  .catch(error => console.log("ERROR", error))

app.use("/api/posts", posts)

app.listen(3000, () => {
  console.log("server is listing to port now!", 3000)
})
