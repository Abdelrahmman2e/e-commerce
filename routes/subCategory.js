const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createFilterObj,
  createsubCateg,
  getAllsubCateg,
  getsubCategById,
  deletesubCateg,
  updatesubCateg,
  setCategoryId
} = require("../controller/subCategoryContoller");
const {
  createSubCategValidator,
  getsubCategValidator,
  updatesubCategValidator,
  deletesubCategValidator,
} = require("../util/validators/subCategoryValidator");


router
  .route("/")
  .get(createFilterObj,getAllsubCateg)
  .post(setCategoryId,createSubCategValidator, createsubCateg);
router
  .route("/:id")
  .get(getsubCategValidator, getsubCategById)
  .put(updatesubCategValidator, updatesubCateg)
  .delete(deletesubCategValidator, deletesubCateg);

module.exports = router;
