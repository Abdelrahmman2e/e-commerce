const { check } = require("express-validator");
const validatorMW = require("../../middlewares/validatorMW");
const slugify = require("slugify");

let createSubCategValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category Required..!")
    .isLength({ min: 2 })
    .withMessage("Too Short Subcategory name..!!")
    .isLength({ max: 32 })
    .withMessage("Too Long Subcategory name..!!"),
  check("category")
    .notEmpty()
    .withMessage("Subcategory must be belong to Category..!!")
    .isMongoId()
    .withMessage("Invalid category Id Format..!!"),
  validatorMW,
];

let getsubCategValidator = [
  check("id").isMongoId().withMessage("Invalid Subcategory Id Format..!! "),
  validatorMW,
];
let updatesubCategValidator = [
  check("id").isMongoId().withMessage("Invalid category Id Format..!!"),
  check("name")
    .notEmpty()
    .withMessage("Category Required..!")
    .isLength({ min: 2 })
    .withMessage("Too Short Subcategory name..!!")
    .isLength({ max: 32 })
    .withMessage("Too Long Subcategory name..!!")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("category")
    .notEmpty()
    .withMessage("Subcategory must be belong to Category..!!")
    .isMongoId()
    .withMessage("Invalid category Id Format..!!"),
  validatorMW,
];
let deletesubCategValidator = [
  check("id").isMongoId().withMessage("Invalid Subcategory Id Format..!! "),
  validatorMW,
];

module.exports = {
  createSubCategValidator,
  getsubCategValidator,
  updatesubCategValidator,
  deletesubCategValidator,
};
