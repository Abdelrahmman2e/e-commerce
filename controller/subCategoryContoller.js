const SubCategory = require("../models/subCategoryModel");
const asyncHandler = require("express-async-handler");
const ApiErrors = require("../util/ApiErrors");
const ApiFeatures = require("../util/ApiFeatures");
const slugify = require("slugify");
const Factory = require("./handlersFactory");

let setCategoryId = (req, res, nxt) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  nxt();
};

let createsubCateg = asyncHandler(async (req, res, nxt) => {
  const { name, category } = req.body;

  let sub = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });

  if (!sub) {
    return nxt(
      new ApiErrors(
        "cannot create new subcategory becaucse some field are missied"
      )
    );
  }
  res.json({ data: sub });
});

let createFilterObj = (req, res, nxt) => {
  let filterObj = {};
  if (req.params.categoryId) filterObj = { category: req.params.categoryId };
  req.filterObj = filterObj;
  nxt();
};
let getAllsubCateg = asyncHandler(async (req, res) => {
  const docsCount = await SubCategory.countDocuments();
  const ApiFeature = new ApiFeatures(SubCategory.find(), req.query)
    .paginate(docsCount)
    .sort()
    .search("Subcategory")
    .fieldsLimit()
    .filter();

  const { mongooseQuery, ResultPagination } = ApiFeature;
  const subcategories = await mongooseQuery;

  res.json({
    results: subcategories.length,
    ResultPagination,
    data: subcategories,
  });
});
let getsubCategById = asyncHandler(async (req, res, nxt) => {
  let subCateg = await SubCategory.findById(req.params.id);
  // populate({path:'category',select:"name -_id"});
  if (!subCateg)
    return nxt(
      new ApiErrors(
        `The Category for this id =>${req.params.id} is Not Found..!!`,
        404
      )
    );
  res.json({ data: subCateg });
});

let updatesubCateg =Factory.updateOne(SubCategory)
let deletesubCateg = Factory.deleteOne(SubCategory);

module.exports = {
  createsubCateg,
  getAllsubCateg,
  getsubCategById,
  updatesubCateg,
  deletesubCateg,
  createFilterObj,
  setCategoryId,
};
