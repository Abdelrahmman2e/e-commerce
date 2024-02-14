const SubCategory = require("../models/subCategoryModel");
const factory = require("./handlersFactory");

let setCategoryId = (req, res, nxt) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  nxt();
};

let createFilterObj = (req, res, nxt) => {
  let filterObj = {};
  if (req.params.categoryId) filterObj = { category: req.params.categoryId };
  req.filterObj = filterObj;
  nxt();
};

let createsubCateg = factory.createOne(SubCategory);

let getAllsubCateg = factory.getAll(SubCategory);

let getsubCategById = factory.getById(SubCategory);

let updatesubCateg = factory.updateOne(SubCategory);

let deletesubCateg = factory.deleteOne(SubCategory);

module.exports = {
  createsubCateg,
  getAllsubCateg,
  getsubCategById,
  updatesubCateg,
  deletesubCateg,
  createFilterObj,
  setCategoryId,
};
