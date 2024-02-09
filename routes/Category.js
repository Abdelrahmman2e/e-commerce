const express = require("express");
const router = express.Router();
const {createNewCateg,deleteCateg,updateCateg,getAllCateg,getCategById}=require("../controller/categoryController");
// const validator = require("../middlewares/categoryValidatorMW");
// const validatorId=require("../middlewares/categoryIdValidator");
const {createNewCategValidator,getCategoryValidator,updateCategValidator,deleteCategValidator} = require("../util/validators/categoryValidator");
const subcategoriesRouter=require("../routes/subCategory");

router.use("/:categoryId/subcategories",subcategoriesRouter)

router
  .route("/")
  .get(getAllCateg)
  .post(
    createNewCategValidator,
    createNewCateg
  );

router
  .route("/:id")
  .get(getCategoryValidator, getCategById)
  .put(
    updateCategValidator,
    updateCateg
  )
  .delete(deleteCategValidator, deleteCateg);

module.exports = router;
