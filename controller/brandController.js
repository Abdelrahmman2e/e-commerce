const Brand = require("../models/brandModel");
const factory=require("./handlersFactory")

//  @desc     Create new Brand
//  @route    POST  /api/brands
//  @access   private

let createBrand =factory.createOne(Brand)

let getAllBrands = factory.getAll(Brand)

let getBrandById =factory.getById(Brand)

let updateBrand =factory.updateOne(Brand)

let deleteBrand =factory.deleteOne(Brand)

module.exports = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};
