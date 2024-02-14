const Product = require("../models/porductModel");
const factory = require("./handlersFactory");

//@desc     create new product
//@route    POST  /api/products
//@acess    private
let createProduct =factory.createOne(Product)
//@desc     get all products
//@route    GET  /api/products
//@access   public
let getAllProducts =factory.getAll(Product)

//@desc     get specific product by id
//@route    GET  /api/products/:id
//@access   public
let getProductById =factory.getById(Product)
//@desc     update specific product by id
//@route    PUT  /api/products/:id
//@access   private

let updateProduct = factory.updateOne(Product);

//@desc     delete specific product by id
//@route    DELETE  /api/products/:id
//@access   private
let deleteProduct = factory.deleteOne(Product);

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
