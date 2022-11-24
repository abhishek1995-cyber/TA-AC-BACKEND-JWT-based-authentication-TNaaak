const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/users");
let articleSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
    taglist: [{ type: String }],
    likes: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Commment" }],
    favouritedCount: { type: Number, default: 0 },
    favouriteList: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);



let Article = mongoose.model("Article", articleSchema);
module.exports = Article;