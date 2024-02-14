const Brand = require("../models/brandModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../util/ApiErrors");
const ApiFeatures = require("../util/ApiFeatures");
const Factory=require("./handlersFactory")

//  @desc     Create new Brand
//  @route    POST  /api/brands
//  @access   private

let createBrand = asyncHandler(async (req, res, nxt) => {
  const { name } = req.body;
  const brand = await Brand.create({ name, slug: slugify(name) });

  if (!brand) {
    return nxt(new ApiError("Some Fields are missed..!!", 400));
  }
  res.status(201).json({ data: brand });
});

let getAllBrands = asyncHandler(async (req, res) => {
  const docsCount = await Brand.countDocuments();
  const ApiFeature = new ApiFeatures(Brand.find(), req.query)
    .paginate(docsCount)
    .sort()
    .search()
    .fieldsLimit()
    .filter();

  const { mongooseQuery, ResultPagination } = ApiFeature;
  const brands = await mongooseQuery;
  res
    .status(200)
    .json({ results: brands.length, ResultPagination, data: brands });
});

let getBrandById = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);
  if (!brand) {
    return nxt(new ApiError(`No Brand for this Id: ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

let updateBrand =Factory.updateOne(Brand)

let deleteBrand =Factory.deleteOne(Brand)

module.exports = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};
