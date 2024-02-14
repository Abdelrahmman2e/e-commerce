const { check } = require("express-validator");
const validatorMW = require("../../middlewares/validatorMW");
const slugify=require("slugify");
let getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id..!!"),
  validatorMW,
];

let createNewCategValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category Required..!!")
    .isLength({ min: 4 })
    .withMessage("Too Short Category Name")
    .isLength({ max: 30 })
    .withMessage("Too Long Category Name").custom((val,{req})=>req.body.slug=slugify(val)),
  validatorMW,
];

let deleteCategValidator = [
  check("id").isMongoId().withMessage("Invalid category Id Format..!!"),
  validatorMW,
];
let updateCategValidator = [
  check("id").isMongoId().withMessage("Invalid category Id Format..!!"),
  check("name")
    .notEmpty()
    .withMessage("Category Required..!!")
    .isLength({ min: 4 })
    .withMessage("Too Short Category Name")
    .isLength({ max: 30 })
    .withMessage("Too Long Category Name").custom((val,{req})=>req.body.slug=slugify(val)),
  validatorMW,
];

module.exports = {
  getCategoryValidator,
  createNewCategValidator,
  deleteCategValidator,
  updateCategValidator,
};
