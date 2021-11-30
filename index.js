const express=require('express')
const bodyParser=require('body-parser')
const posts =require('./routes/posts')
const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(
  `mongodb+srv://wejdan-2299:${process.env.MONGODB_PASSWORD}@cluster0.h2i6u.mongodb.net/testDB?retryWrites=true&w=majority`
).then(()=>{
  console.log("Connect to mongoDB")
})
.catch(error=>{
  console.log("error connecting to mongoDB", error)
})


const app=express()
console.log(process.env.MONGODB_PASSWORD)

app.use(bodyParser.json())

app.use("/api/posts",posts)




app.listen(3000, () => {
    console.log("server is listening on port:" + 3000);
  });