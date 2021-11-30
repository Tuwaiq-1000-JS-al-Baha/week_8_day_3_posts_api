const express = require("express")
const bodyParser = require("body-parser")

const posts = require("./routes/posts")
const mongoose = require("mongoose")
require("dotenv").config()



//------------------------------عشان نسوي كونكتيدمع عشان نرط الاي بي الي والداتا بيس -------------//
mongoose
  .connect(
    `mongodb+srv://suaad:${process.env.MONGODB_PASSWORD1}@cluster0.jvtwl.mongodb.net/testDB?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MONGODB")
  })
  .catch(error => {
    console.log("Error connecting to MONGODB", error)
  })

  //////-------------------------------------------------------------------------------------------------------------
console.log(process.env.MONGODB_PASSWORD1)
const app = express()

app.use(bodyParser.json())

app.use("/api/posts", posts)


app.listen(3000, () => {
  console.log("server is listen on port" + 3000)
})
