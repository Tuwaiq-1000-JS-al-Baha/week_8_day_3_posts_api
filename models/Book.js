const mangoose = require("mongoose")
const Joi =require("joi")
const { date } = require("joi")


const books2Schema = new mangoose.Schema({
  title: String,
  author: String,
numberOfCopies: Number,
dateCreated: {
    type: Date,
    default: Date.now,
 },
})

const bookJoi =Joi.object({

  title:Joi.string().min(2).max(200).required(),
  author:Joi.string().min(2).max(200).required(),
  numberOfCopies:Joi.number().min(0).required(),
  image:Joi.string().uri().max(100000).required()
})
const Book = mangoose.model("Book", books2Schema)
module.exports.Book = Book
module.exports.bookJoi=bookJoi