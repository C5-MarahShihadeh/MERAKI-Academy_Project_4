const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  country: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart:[{type: mongoose.Schema.Types.ObjectId, ref: "Products"}]
});

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});
module.exports = mongoose.model("User", userSchema);
