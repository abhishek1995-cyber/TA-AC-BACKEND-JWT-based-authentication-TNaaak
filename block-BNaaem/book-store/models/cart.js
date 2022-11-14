var mongoose = require("mongoose");
var cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
    },
});

var Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;