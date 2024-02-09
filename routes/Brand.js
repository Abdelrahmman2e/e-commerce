const express = require("express");
const router = express.Router();
const {createBrand,deleteBrand,updateBrand,getAllBrands,getBrandById}=require("../controller/brandController");

const {createBrandValidator,getBrandValidator,updateBrandValidator,deleteBrandValidator} = require("../util/validators/brandValidator");




router
  .route("/")
  .get(getAllBrands)
  .post(
    createBrandValidator,
    createBrand
  );

router
  .route("/:id")
  .get(getBrandValidator, getBrandById)
  .put(
    updateBrandValidator,
    updateBrand
  )
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
