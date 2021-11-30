const express = require("express")
const bodyParser = require("body-parser")
const posts = require("./routes/posts")
const app = express()
require("dotenv").config()
const mongoose= require("mongoose")
mongoose.connect(
  `mongodb+srv://ey07:${process.env.MONGODB_PASSWORD1}@cluster0.9f54j.mongodb.net/textDB`
)
.then(()=>{
  console.log("Connected to MongoDB")
})
.catch(error=>{
  console.log(" Error Connected to MongoDB",error)
})

app.use(bodyParser.json())
app.use("/api/posts", posts)

app.listen(3000, () => {
  console.log("server is listening on port:" + 3000)
})