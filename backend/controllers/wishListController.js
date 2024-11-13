const wishListModel = require("../models/wishList.Model");

// read all wishlists
exports.getAllWishLists = async (req, res) => {
  try {
    const wishLists = await wishListModel.find();
    res.status(200).json(wishLists);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// read wishlist by ID
exports.getWishListById = async (req, res) => {
  try {
    const wishList = await wishListModel.findById(req.params.id);
    res.status(200).json(wishList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// read wishlist by user
exports.getWishListByUser = async (req, res) => {
  try {
    const wishList = await wishListModel.find({ user: req.params.id });
    res.status(200).json(wishList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// create wishlist
const createWishList = async (userId, wishlistData) => {
  const wishList = new wishListModel(wishlistData);
  wishList.user = userId;
  try {
    await wishList.save();
    return wishList;
  } catch (error) {
    console.error("Error creating wishlist:", error);
  }
};

//add product to wishlist
exports.addProductToWishList = async (req, res) => {
  // check if wishlist exists if not create one
  const userId = req.body.user;
  try {
    const wishList = await wishListModel.findOne({ user: userId });
    if (!wishList) {
      const newWishList = await createWishList(userId, req.body);
      res.status(201).json(newWishList);
    } else {
      wishList.products.push(req.body);
      await wishList.save();
      res.status(200).json(wishList);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// remove product from wishlist
exports.removeProductFromWishList = async (req, res) => {
  try {
    const wishList = await wishListModel.findOne({ user: req.body.user });
    if (!wishList) {
      res.status(404).json({ message: "Wishlist not found" });
    } else {
      wishList.products = wishList.products.filter(
        (product) => product.product != req.body.product
      );
      await wishList.save();
      res.status(200).json(wishList);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
