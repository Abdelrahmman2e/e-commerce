const express = require("express");
const router = express.Router();
const {createProduct,deleteProduct,updateProduct,getAllProducts,getProductById}=require("../controller/productController");
const {createProductValidator,getProductValidator,updateProductValidator,deleteProductValidator} = require("../util/validators/productValidator");



router
  .route("/")
  .get(getAllProducts)
  .post(
    createProductValidator,
    createProduct
  );

router
  .route("/:id")
  .get(getProductValidator, getProductById)
  .put(
    updateProductValidator,
    updateProduct
  )
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
