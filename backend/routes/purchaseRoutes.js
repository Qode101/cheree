const express = require("express");
const router = express.Router();

const {
  createPurchase,
  getPurchaseById,
  getPurchaseByUser,
  getAllPurchases,
  updatePurchase,
  deletePurchase,
} = require("../controllers/purchaseController");

router.get("/all", getAllPurchases);
router.get("/:id", getPurchaseById);
router.get("/user/:id", getPurchaseByUser);
router.post("/add", createPurchase);
router.put("/update/:id", updatePurchase);
router.delete("/delete/:id", deletePurchase);

module.exports = router;
