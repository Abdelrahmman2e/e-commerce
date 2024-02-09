const { check } = require("express-validator");
const validatorMW = require("../../middlewares/validatorMW");

let getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id..!!"),
  validatorMW,
];

let createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category Required..!!")
    .isLength({ min: 2 })
    .withMessage("Too Short Brand Name")
    .isLength({ max: 30 })
    .withMessage("Too Long Brand Name"),
  validatorMW,
];

let deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id Format..!!"),
  validatorMW,
];
let updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand Id Format..!!"),
  check("name")
    .notEmpty()
    .withMessage("Brand Required..!!")
    .isLength({ min: 2 })
    .withMessage("Too Short Brand Name")
    .isLength({ max: 30 })
    .withMessage("Too Long Brand Name"),
  validatorMW,
];

module.exports = {
  createBrandValidator,
  getBrandValidator,
  deleteBrandValidator,
  updateBrandValidator,
};
