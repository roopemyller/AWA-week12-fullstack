"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Book_1 = require("../models/Book");
const router = (0, express_1.Router)();
router.post("/api/book", async (req, res) => {
    try {
        const { author, name, pages } = req.body;
        const book = new Book_1.Book({ author, name, pages });
        await book.save();
        res.status(201).json(book);
    }
    catch (error) {
        res.status(400).json({ message: "Error creating a book", error });
        return;
    }
});
router.get("/api/books", async (req, res) => {
    try {
        const books = await Book_1.Book.find();
        res.status(201).json(books);
    }
    catch (error) {
        res.status(400).json({ message: "Error getting a books", error });
        return;
    }
});
exports.default = router;
