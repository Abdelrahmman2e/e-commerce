const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMW = require("../../middlewares/validatorMW");
const Category = require("../../models/categoryModel");
const SubCategory = require("../../models/subCategoryModel");

let createProductValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .notEmpty()
    .withMessage("Product required")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Too long description"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("To long price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),

  check("colors")
    .optional()
    .isArray()
    .withMessage("availableColors should be array of string"),
  check("imageCover").notEmpty().withMessage("Product imageCover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of str ing"),
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to a category")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id: ${categoryId}`)
          );
        }
      })
    ),

  check("subcategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((subcategoriesIds) =>
      SubCategory.find({
        _id: { $exists: true, $in: subcategoriesIds },
      }).then((res) => {
        if (res.length < 1 || res.length != subcategoriesIds.length) {
          return Promise.reject(new Error(`Invalid Subcategories Ids`));
        }
      })
      )
      .custom((val, { req }) =>
      SubCategory.find({ category: req.body.category }).then(
        (subcategoriesIds) => {
          const subcategoriesIdsDB = [];
          subcategoriesIds.forEach((subcategory) => {
            subcategoriesIdsDB.push(subcategory._id.toString());
          });
          const checker=(target,arr)=>target.every((v)=>arr.includes(v))
          if(!checker(val,subcategoriesIdsDB)){
            return Promise.reject(new Error(`subcategoreies not belong to category`));
          }
        }
      )
    ),
  check("brand").optional().isMongoId().withMessage("Invalid ID format"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingsAverage must be a number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5.0"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingsQuantity must be a number"),

  validatorMW,
];

let getProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  validatorMW,
];

let updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  body("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMW,
];

let deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID formate"),
  validatorMW,
];

module.exports = {
  createProductValidator,
  getProductValidator,
  deleteProductValidator,
  updateProductValidator,
};
