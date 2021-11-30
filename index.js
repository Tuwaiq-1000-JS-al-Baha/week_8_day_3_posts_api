const express = require("express")
const bodyParser = require("body-parser")
const posts = require("../routes/posts")

const mongoose = require("mongoose")

require("dotenv").config()
mongoose
  .connect(
    `mongodb+srv://Magdi7021:${process.env.MONGODB_PASSWORD}@cluster0.egoyx.mongodb.net/testDB?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connected to NongoDB")
  })
  .catch(error => {
    console.log("Error connecting to MongoDb", error)
  })

const app = express()

app.use(bodyParser.json()) //خاصية بودي بارسر

app.use("/api/posts", posts)



app.listen(3000, () => {
  console.log("server is listening on port : " + 3000)
})
 