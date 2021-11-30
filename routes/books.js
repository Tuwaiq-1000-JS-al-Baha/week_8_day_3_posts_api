const express = require("express")
const router = express.Router()
const { Book, bookJoi } = require("../models/Book")
const mongoose = require("mongoose")
router.get("/", async (req, res) => {
    const books = await Book.find().select("-__v").limit(50).sort("-dateCreated")

    res.json(books)
})
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json("book id should be a valid object id")
        }
        const book = await Book.findById(id).select("-price")
        if (!book) {
            return res.status(404).json("book not found")
        }

        res.json(book)
    } catch (error) {
        return res.status(500).json("Internal error")

    }
})



router.post("/", async (req, res) => {
    const bookBody = req.body
    const{ title, author, numberOfCopies } = bookBody

    const result = bookJoi.validate(bookBody)

    if (result.error) {
        return res.status(400).json(result.error.details[0].message)
    }
    const book = new Book({
       title,
       author,
       numberOfCopies,
    })
    try {
        await book.save()
    } catch (error) {
        return res.status(500).json("Internal error")
    }
    res.json(book)
})
router.put("/:id", async (req, res) => {
    const id = req.params.id
    const { title, author, numberOfCopies } = req.body

    const book = await Book.findByIdAndUpdate(id, {
        $set: { title, author, numberOfCopies },
    })

    if (!book) return res.status(404).json("book not found")
    res.json(book)
})
router.delete("/:id", async (req, res) => {
    const book = await Book.findById(req.params.id)
    if (!book) return res.status(404).json("book not found")
    await book.remove()
    res.json("book removed")
})
module.exports = router
