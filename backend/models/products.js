const mongoose = require("mongoose");

const products = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  img: {type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("Products", products);
