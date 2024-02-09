const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Category = require("../models/categoryModel");
const ApiError = require("../util/ApiErrors");

//@desc     create new category
//@route    POST  /api/categories
//@acess    private
let createNewCateg = async (req, res, nxt) => {
  const categ = await Category.create({
    name: req.body.name,
    slug: slugify(req.body.name),
  });

  if (!categ) {
    return nxt(new ApiError("Some Field Are Missed..!!", 400));
  } else {
    res.status(201).json({ data: categ });
  }
};

//@desc     get all categories
//@route    GET  /api/categories
//@access   public
let getAllCateg = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 7;
  const skip = (page - 1) * limit;

  const categories = await Category.find().skip(skip).limit(limit).exec();
  res.json({ results: categories.length, page, data: categories });
});

//@desc     get specific category by id
//@route    GET  /api/categories/:id
//@access   public
let getCategById = asyncHandler(async (req, res, nxt) => {
  const categ = await Category.findById(req.params.id).exec();
  if (!categ)
    return nxt(
      new ApiError(
        `The Category for this id =>${req.params.id} is Not Found..!!`,
        404
      )
    );

  res.json({ data: categ });
});

//@desc     update specific category by id
//@route    PUT  /api/categories/:id
//@access   private

let updateCateg = asyncHandler(async (req, res, nxt) => {
  const name = req.body.name;
  let categ = await Category.findByIdAndUpdate(
    req.params.id,
    { name, slug: slugify(name) },
    { new: true }
  );
  if (categ) {
    res.json({ data: categ });
  } else {
    nxt(new ApiError(`The Category with given Id is not found..!!`, 404));
  }
});

//@desc     delete specific category by id
//@route    DELETE  /api/categories/:id
//@access   private
let deleteCateg = asyncHandler(async (req, res, nxt) => {
  let categ = await Category.findByIdAndDelete(req.params.id);
  if (!categ) {
    nxt(new ApiError("The Category with given Id is not found..!!", 404));
  } 
    res.status(204);

});

module.exports = {
  createNewCateg,
  getAllCateg,
  getCategById,
  updateCateg,
  deleteCateg,
};
