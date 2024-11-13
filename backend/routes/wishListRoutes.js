const express = require("express");
const router = express.Router();

const {
  removeProductFromWishList,
  addProductToWishList,
  getAllWishLists,
  getWishListById,
  getWishListByUser,
} = require("../controllers/wishListController");

router.get("/all", getAllWishLists);
router.get("/:id", getWishListById);
router.get("/user/:id", getWishListByUser);
router.post("/add", addProductToWishList);
router.delete("/remove", removeProductFromWishList);

module.exports = router;
