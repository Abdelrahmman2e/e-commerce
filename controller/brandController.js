const Brand = require("../models/brandModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../util/ApiErrors");

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
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const brands = await Brand.find({}).limit(limit).skip(skip).exec();

  res.status(200).json({ results: brands.length, page, data: brands });
});

let getBrandById = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);
  if (!brand) {
    return nxt(new ApiError(`No Brand for this Id: ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

let updateBrand = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await Brand.findByIdAndUpdate(
    id,
    {
      name,
      slug: slugify(name),
    },
    { new: true }
  );
  if (!brand) {
    return nxt(new ApiError(`No Brand for this Id: ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

let deleteBrand = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    return nxt(new ApiError(`No Brand for this Id: ${id}`, 404));
  }
  res.status(204).end();
});

module.exports = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};
