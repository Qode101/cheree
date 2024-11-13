const wishListModel = require("../models/wishList.Model");
const productModel = require("../models/product.Model");
const userModel = require("../models/user");
const mongoose = require("mongoose");

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

// check if id exists in the model
const checkIdExists = async (id, model) => {
  const found = await model.findById(id);
  if (!found) {
    throw new Error(`Id of ${model} not found: ${id}`);
  }
  return true;
};

// create wishlist
const createWishList = async (req) => {
  console.log("Creating wishlist", 433333433);

  const { userId, productId } = req.body;

  // Fetch the user document from the database
  await checkIdExists(userId, userModel);
  await checkIdExists(productId, productModel);

  // Create the wishlist with the resolved values
  const wishList = new wishListModel({
    user: userId,
    products: [{ product: productId }],
  });

  console.log("wishList", wishList);
  await wishList.save();

  return wishList;
};

//add product to wishlist
exports.addProductToWishList = async (req, res) => {
  // check if wishlist exists if not create one
  const { userId, productId } = req.body;
  try {
    const wishList = await wishListModel.findOne({ user: userId });
    if (!wishList) {
      const newWishList = await createWishList(req);
      res.status(201).json(newWishList);
    } else {
      await checkIdExists(productId, productModel);
      wishList.products.push({ product: productId });
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
    const wishList = await wishListModel.findOne({ user: req.body.userId });
    if (!wishList) {
      res.status(404).json({ message: "Wishlist not found" });
    } else {
      // Use .equals to correctly compare ObjectId fields
      wishList.products = wishList.products.filter((product) => {
        return !product.product.equals(req.body.productId);
      });

      await wishList.save();
      res.status(200).json(wishList);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
