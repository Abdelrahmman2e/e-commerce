const Category = require("../models/categoryModel");
const factory=require("./handlersFactory")

//@desc     create new category
//@route    POST  /api/categories
//@acess    private
let createNewCateg = factory.createOne(Category)

//@desc     get all categories
//@route    GET  /api/categories
//@access   public
let getAllCateg = factory.getAll(Category)

//@desc     get specific category by id
//@route    GET  /api/categories/:id
//@access   public
let getCategById = factory.getById(Category)

//@desc     update specific category by id
//@route    PUT  /api/categories/:id
//@access   private

let updateCateg =factory.updateOne(Category)

//@desc     delete specific category by id
//@route    DELETE  /api/categories/:id
//@access   private

let deleteCateg=factory.deleteOne(Category);

module.exports = {
  createNewCateg,
  getAllCateg,
  getCategById,
  updateCateg,
  deleteCateg
};
