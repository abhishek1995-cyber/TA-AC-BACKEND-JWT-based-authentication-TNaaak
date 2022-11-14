var mongoose = require("mongoose");
var bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        },
    ],
    author: {
        type: String,
    },
    price: {
        type: Number,
    },
    comments: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    },
    ],
    tags: [{ type: String }],
});
var Book = mongoose.model("Book", bookSchema);
module.exports = Book;