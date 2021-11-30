const express = require("express")
const bodyParser = require("body-parser")
const posts = require ("./routes/post")
const mongoose = require("mongoose")

const app = express()
require("dotenv").config()

mongoose.connect(
    `mongodb+srv://rahafAlghamdi:${process.env.MONOGDB_PASSWORD}@cluster0.j1edm.mongodb.net/post`
)
.then(() => {
    console.log("connected to MongoDB");
})
.catch(error => {
    console.log("Error connecting to MongoDB" , error);
})

app.use(bodyParser.json())

app.use("/api/posts" , posts)

app.listen(3000, () => {
    console.log("server is listening on port:" + 3000);
})