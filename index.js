const express = require("express")
const bodyParser = require("body-parser")
const posts = require("./routers/posts")

const mongoose = require("mongoose")
require("dotenv").config()

mongoose
  .connect(
    `mongodb+srv://lama-2000:${process.env.MONGODB_PASSWORD}@cluster0.hfgau.mongodb.net/test1?retryWrites=true&w=majority`
  )

  .then(() => {
    console.log("conect to ManogoDB")
  })
  .catch(error => {
    console.log("Erorr concting to ManogoDB", error)
  })
require("dotenv").config()
console.log(process.env.MONGODB_PASSWORD)

const app = express()
app.use(bodyParser.json())
app.use("/api/posts", posts)

app.listen(3000, () => {
  console.log("sever is listing" + 3000)
})
