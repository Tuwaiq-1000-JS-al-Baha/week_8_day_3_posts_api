const express = require("express")
const bodyParser = require("body-parser")
const posts = require("./routes/posts")
const mongoose = require("mongoose")
require("dotenv").config()

mongoose
  .connect(`mongodb+srv://shahadgh:${process.env.MONOGDB_PASSWORD}@cluster0.nbouy.mongodb.net/testDB`)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch(error => {
    console.log("Error conneceting to MongoDB", error)
  })

const app = express()

app.use(bodyParser.json())

app.use("/api/posts", posts)


app.listen(3000, () => {
  console.log("server is listening on port :" + 3000)
})
