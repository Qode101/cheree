const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
} = require("../controllers/productController");

router.get("/allPoducts", getAllProducts);

router.post("/createProduct", createProduct);

module.exports = router;
