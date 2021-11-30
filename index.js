const  express =require("express")
const bodyParser = require('body-parser')
const posts = require("./routers/posts")
const mongoose = require("mongoose")

const app =express()
app.use(bodyParser.json())


mongoose.connect(
    `mongodb+srv://user1332Mood:${process.env.MONGODB_PASSWORD}@cluster0.aiiku.mongodb.net/testDB?retryWrites=true&w=majority`
   
)
.then(() =>  console.log("connected")    )
.catch(error => console.log("error:" , error))

app.use("/posts" , posts)

app.listen(3000 , () => {
    console.log("server is listen:" + 3000)
})

