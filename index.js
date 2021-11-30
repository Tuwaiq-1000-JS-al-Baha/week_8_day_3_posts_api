const express=require("express")
const bodyParser=require("body-parser")
const posts = require("./routes/posts")
const app=express()
require("dotenv").config()

const mongoose = require("mongoose")
mongoose
  .connect(
    `mongodb+srv://Arwa1994:${process.env.MONGODB_PASSWORD1}@cluster0.iaxfu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connected to Mongdb")
  })
  .catch(error => {
    console.log("error connecting to mongodp")
  })
app.use(bodyParser.json())
app.use("/api/posts", posts)


app.listen(3000, () => {
  console.log("server is listining on port:" + 3000)
})
