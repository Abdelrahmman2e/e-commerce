const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Product = require("../models/porductModel");
const ApiError = require("../util/ApiErrors");

//@desc     create new product
//@route    POST  /api/products
//@acess    private
let createProduct = async (req, res, nxt) => {
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);

  if (!product) {
    return nxt(new ApiError("Some Field Are Missed..!!", 400));
  }
  res.status(201).json({ data: product });
};

//@desc     get all products
//@route    GET  /api/products
//@access   public
let getAllProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 7;
  const skip = (page - 1) * limit;

  const products = await Product.find()
    .populate({ path: "category", select: "name -_id" })
    .skip(skip)
    .limit(limit)
    .exec();
  res.json({ results: products.length, page, data: products });
});

//@desc     get specific product by id
//@route    GET  /api/products/:id
//@access   public
let getProductById = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate({ path: "category", select: "name -_id" }).exec();
  if (!product) {
    return nxt(
      new ApiError(
        `The Product for this id =>${req.params.id} is Not Found..!!`,
        404
      )
    );
  } else {
    res.status(200).json({ data: product });
  }
});

//@desc     update specific product by id
//@route    PUT  /api/products/:id
//@access   private

let updateProduct = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;
  if(req.body.title){
    req.body.slug = slugify(req.body.title);
  }
  let product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  if (product) {
    res.json({ data: product });
  } else {
    return nxt(new ApiError(`The Product with given Id is not found..!!`, 404));
  }
});

//@desc     delete specific product by id
//@route    DELETE  /api/products/:id
//@access   private
let deleteProduct = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;
  let product = await Product.findByIdAndDelete(id);
  if (!product) {
    nxt(new ApiError("The Product with given Id is not found..!!", 404));
  }
  res.status(204).end();
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
