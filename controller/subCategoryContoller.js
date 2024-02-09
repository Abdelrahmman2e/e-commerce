const SubCategory = require("../models/subCategoryModel");
const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const ApiErrors = require("../util/ApiErrors");
const slugify = require("slugify");

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
  const page = req.query.page || 1;
  const limit = req.query.limit || 7;
  const skip = (page - 1) * limit;

  let subCateg = await SubCategory.find(req.filterObj).skip(skip).limit(limit);
  // populate({path:'category',select:"name -_id"}).exec();
  res.json({ results: subCateg.length, page, data: subCateg });
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
let updatesubCateg = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params.id;
  const { name, category } = req.body;
  let subCateg = await SubCategory.findByIdAndUpdate(
    id,
    {
      name,
      slug: slug(req.body.name),
      category,
    },
    { new: true }
  );

  if (!subCateg) {
    return nxt(
      new ApiErrors(
        `The Category for this id =>${req.params.id} is Not Found..!!`,
        404
      )
    );
  }
  res.status(200).json({ data: subCateg });
});
let deletesubCateg = asyncHandler(async (req, res, nxt) => {
  let subCateg = await SubCategory.findByIdAndDelete(req.params.id);

  if (!subCateg)
    return nxt(
      new ApiErrors(
        `The Category for this id =>${req.params.id} is Not Found..!!`,
        404
      )
    );
  res.status(204);
});

module.exports = {
  createsubCateg,
  getAllsubCateg,
  getsubCategById,
  updatesubCateg,
  deletesubCateg,
  createFilterObj,
  setCategoryId,
};
