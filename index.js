const express = require("express")
const bodyParser = require("body-parser")
const books = require("./routes/books")
const mongoose = require("mongoose")
require("dotenv").config()
console.log(process.env.MANGODB_PASSWORD)

mongoose
  .connect(
    `mongodb+srv://bader07:${process.env.MANGODB_PASSWORD}@cluster0.h34sm.mongodb.net/test?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch(error => {
    console.log("Error connecting to MongoDB", error)
  })

const app = express()

app.use(bodyParser.json())

app.use("/api/books", books)

app.listen(3000, () => {
  console.log("server is listening on port: " + 3000)
})
