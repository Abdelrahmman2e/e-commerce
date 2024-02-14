const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Category = require("../models/categoryModel");
const ApiError = require("../util/ApiErrors");
const ApiFeatures = require("../util/ApiFeatures");
const Factory=require("./handlersFactory")

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
  const docsCount=await Category.countDocuments();
  const ApiFeature=new ApiFeatures(Category.find(),req.query).paginate(docsCount).sort().fieldsLimit().filter().search();
  const {mongooseQuery,ResultPagination}=ApiFeature
const categories=await mongooseQuery;
  res.json({ results: categories.length, ResultPagination, data: categories });
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

let updateCateg =Factory.updateOne(Category)

//@desc     delete specific category by id
//@route    DELETE  /api/categories/:id
//@access   private

let deleteCateg=Factory.deleteOne(Category);

module.exports = {
  createNewCateg,
  getAllCateg,
  getCategById,
  updateCateg,
  deleteCateg
};
