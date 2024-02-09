//import mongoose
const mongoose = require("mongoose");

//create schema
const subCategSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 2,
      maxLength: 32,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "categories",
      required: true,
    },
  },
  { timestamps: true }
);
//create model
module.exports = mongoose.model("subcategories", subCategSchema);
