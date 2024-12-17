const express = require("express");
const router = express.Router();
const { paginate } = require("../middleware/paginationMiddle");
const productModel = require("../models/product.Model");

const {
  createProduct,
  updateProduct,
  getProduct,
  find,
  deleteProduct,
  getAllProducts,
} = require("../controllers/productController");

router.get("/all", paginate(productModel));
router.get("/find/", find); // find products by name, category, price ie
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);
router.get("/view/:id", getProduct);
router.post("/create", createProduct);

module.exports = router;
