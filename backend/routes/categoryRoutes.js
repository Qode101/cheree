const express = require("express");
const router = express.Router();

const {
  getCategory,
  deleteCategory,
  updateCategory,
  findCategoryByName,
  viewAllCategories,
  createCategory,
} = require("../controllers/categoryController");

router.get("/viewAll", viewAllCategories);
router.get("/findByName/:name", findCategoryByName);
router.delete("/delete/:id", deleteCategory);
router.put("/update/:id", updateCategory);
router.get("/view/:id", getCategory);
router.post("/create", createCategory);

module.exports = router;
