var mongoose = require("mongoose");
var commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
});

var Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;