const express = require("express");
const router = express.Router();
const { paginate } = require("../middleware/paginationMiddle");
const categoryModel = require("../models/category.Model");

const {
  getCategory,
  deleteCategory,
  updateCategory,
  findCategoryByName,
  createCategory,
} = require("../controllers/categoryController");

router.get("/all", paginate(categoryModel));
router.get("/findByName/:name", findCategoryByName);
router.delete("/delete/:id", deleteCategory);
router.put("/update/:id", updateCategory);
router.get("/view/:id", getCategory);
router.post("/create", createCategory);

module.exports = router;
