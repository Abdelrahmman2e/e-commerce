const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Product = require("../models/porductModel");
const ApiError = require("../util/ApiErrors");
const ApiFeatures = require("../util/ApiFeatures");
const Factory = require("./handlersFactory");

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
  const docsCount = await Product.countDocuments();
  const ApiFeature = new ApiFeatures(Product.find(), req.query)
    .paginate(docsCount)
    .filter()
    .sort()
    .fieldsLimit()
    .search("Product");

  const { mongooseQuery, ResultPagination } = ApiFeature;
  const products = await mongooseQuery;
  res.json({ results: products.length, ResultPagination, data: products });
});

//@desc     get specific product by id
//@route    GET  /api/products/:id
//@access   public
let getProductById = asyncHandler(async (req, res, nxt) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate({ path: "category", select: "name -_id" })
    .exec();
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

let updateProduct = Factory.updateOne(Product)

//@desc     delete specific product by id
//@route    DELETE  /api/products/:id
//@access   private
let deleteProduct = Factory.deleteOne(Product);

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
