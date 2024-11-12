const express = require("express");
const router = express.Router();

const {
  createProduct,
  updateProduct,
  getAllProducts,
  getProduct,
  findProductByCategory,
  findProductByName,
  findProductByPrice,
  deleteProduct,
} = require("../controllers/productController");

router.get("/allProducts", getAllProducts);
router.get("/findByName/:name", findProductByName);
router.get("/findByCategory/:category", findProductByCategory);
router.get("/findByPrice/:price", findProductByPrice);
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);
router.get("/view/:id", getProduct);
router.post("/create", createProduct);

module.exports = router;
