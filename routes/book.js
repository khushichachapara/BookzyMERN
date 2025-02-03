const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");

//add book-admin

router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { url, title, author, price, desc, language } = req.body;
        //console.log(req.body);

        if (!url || !title || !author || !price || !desc || !language) {
            return res.status(400).json({ message: "All fields are required." });
        }


        const { id } = req.headers;
        const user = await User.findById(id);

        if (user.role !== "admin") {
            return res.status(400).json({ message: "You do not have access to perform admin work" });
        }

        /*const existingBook = await Book.findOne({ title: req.body.title });
        if (existingBook) {
            return res.status(400).json({ message: "A book with this title already exists." });
        }*/
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,

        });

        await book.save();
        res.status(200).json({ message: "Book Added Successfully." });
    } catch (error) {
        console.log(error);
        console.error("Error adding book:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });

    }
});

//update book

router.put("/update-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {

            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,

        });

        return res.status(200).json({ message: "Book Updated Successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occured." });

    }
});

//delete book-admin

router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "Book Deleted Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error occurred" });


    }

});

//get all-books

router.get("/get-all-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.json({ status: "Success", data: books, });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An Error Occured" });
    }
});

//get recent-books
router.get("/get-recent-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        return res.json({ status: "Success", data: books, });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An Error Occured" });
    }
});

//get book by id
router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.json({
            status: "success",
            data: book,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An Error Occured" });
    }
});


module.exports = router;