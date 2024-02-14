const mongoose = require("mongoose");

//create schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: 4,
      maxLength: 30,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
// create model
module.exports = mongoose.model("categories", categorySchema);
