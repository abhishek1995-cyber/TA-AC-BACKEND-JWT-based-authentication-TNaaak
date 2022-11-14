const Book = require("../models/book");
const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const Category = require("../models/category");
const { create } = require("../models/book");
var auth = require('../middlewares/auth');
const User = require("../models/user");

//list all the books


router.use(auth.verifyToken)

// key: Authoriztion,  value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzcxZTQ2ODNkMWNkYzZiYjEwN2IwYWMiLCJlbWFpbCI6InVzZXI1QGdtYWlsLmNvbSIsImlhdCI6MTY2ODQwODkwMX0.thtTeaNJNy641s76PsF_45jME6Djl1qqRE8D5xaqbsc

router.get("/", async (req, res) => {
  try {
    let books = await Book.find({}).populate("comments");
    res.status(202).json({books});
  } catch (err) {
    res.status(500).json(err);
  }
});

// to Create a book

router.post("/", async (req, res) => {
  try {
    let book = await Book.create(req.body);
    res.status(202).json({ book});
  } catch (err) {
    res.status(500).json(err);
  }

  //delete a book
  router.get("/delete/:id", async (req, res) => {
    try {
      let id = req.params.id;
      let book = await Book.findByIdAndDelete(id);
      res.status(202).json(book);
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

//update a book put request can be done only from the postman

router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let book = await Book.findByIdAndUpdate(id, req.body, { new: true });
    res.status(202).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

//  now  this all is  to add a comment  now

router.post("/:bookId/comment", async (req, res) => {
  try {
    let bookId = req.params.bookId;
    req.body.bookId = bookId;
    let comment = await Comment.create(req.body);
    let updateBook = await Book.findByIdAndUpdate(
      bookId,
      { $push: { comments: comment._id } },
      { new: true }
    );
    res.status(202).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// to delete a comment

router.get("/comment/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let comment = await Comment.findByIdAndDelete(id);
    res.status(202).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// to edit a comment

router.put("/comment/edit/:id", async (req, res) => {
  try {
    console.log(req.body);
    let id = req.params.id;
    let comment = await Comment.findByIdAndUpdate(id, req.body, { new: true });
    res.status(202).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* List all Categories */

router.get(`/category`, async (req, res) => {
    try {
        let allCategories = await Category.find({})
        console.log(allCategories, "allCategories")
        res.status(202).json(allCategories)
    } catch (error) {
      res.status(500).json(error); 
    }
})

/* List books by Categories */

router.get(`/category/:id`, async (req, res) => {
    try {
        let id = req.params.id
        let booksByCat = await Book.find({$match: {category: id}})
        res.status(202).json(booksByCat)
    } catch (error) {
      res.status(500).json(error); 
    }
})

/* Count books by Categories */

router.get(`/category/:id`, async (req, res) => {
    try {
        let id = req.params.id
        let totalBooksByCat = await Book.find({$match: {category: id}})
        res.status(202).json(totalBooksByCat.length)
    } catch (error) {
      res.status(500).json(error); 
    }
})

/* List books by Author */

router.get(`/author/:name`, async (req, res) => {
    try {
        let author = name
        let booksByAuthor = await Book.find({$match: {author: author}})
        res.status(202).json(booksByAuthor)
    } catch (error) {
      res.status(500).json(error); 
    }
})

/* Create Category */

router.post(`/category`, async (req, res) => {
    try {
        
        let createdCategory = await Category.create(req.body)
        res.status(202).json(createdCategory)
    } catch (error) {
      res.status(500).json(error); 
    }
})

/* Edit a Category */

router.put(`/category/:id"`, async (req, res) => {
    try {
        let id = req.params.id
        let editedCategory = await Category.findOneAndUpdate(id, req.body, {new: true})
        res.status(202).json(editedCategory)
    } catch (error) {
      res.status(500).json(error); 
    }
})

/* Delete a Category */

router.delete(`/category/:id"`, async (req, res) => {
    try {
        let id = req.params.id
        let deletedCategory = await Category.findOneAndDelete(id, req.body, {new: true})
        res.status(202).json(deletedCategory)
    } catch (error) {
      res.status(500).json(error); 
    }
})


module.exports = router;