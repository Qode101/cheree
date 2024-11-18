const wishListModel = require("../models/wishList.Model");
const productModel = require("../models/product.Model");
const userModel = require("../models/user");
const { checkIdExists } = require("../utils/utilites");
const { tryCatch, AppError } = require("../utils/tryCatch");

// read all wishlists
exports.getAllWishLists = tryCatch(async (req, res) => {
  const wishLists = await wishListModel.find().populate("products");
  res.status(200).json(wishLists);
});

// read wishlist by ID
exports.getWishListById = tryCatch(async (req, res) => {
  const wishList = await wishListModel
    .findById(req.params.id)
    .populate(products);

  if (!wishList) {
    return res.status(404).json({ message: "Wishlist not found" });
  }

  res.status(200).json(wishList);
});

// read wishlist by user
exports.getWishListByUser = tryCatch(async (req, res) => {
  const wishList = await wishListModel
    .find({ user: req.params.id })
    .populate("products");
  res.status(200).json(wishList);
});

/**
 * Create a wishlist
 * @param {Object} req - The request body
 * @returns {Object} - The created wishlist
 *
 */
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

/**
 * Add a product to a wishlist
 * @param {*} req
 * @param {*} res
 * @returns {Object} - The updated wishlist
 */

exports.addProductToWishList = tryCatch(async (req, res) => {
  const { userId, productId } = req.body;

  // Check if wishlist exists, if not, create one
  const wishList = await wishListModel.findOne({ user: userId });

  if (!wishList) {
    const newWishList = await createWishList(req);
    return res.status(201).json(newWishList); // Respond after creating a new wishlist
  } else {
    await checkIdExists(productId, productModel);
    wishList.products.push({ product: productId });
    await wishList.save();
    return res.status(200).json(wishList);
  }
});

/**
 * Remove a product from a wishlist
 * @param {Object} req - The request body
 * @param {Object} res - The response body
 * @returns {Object} - The updated wishlist
 *
 */

exports.removeProductFromWishList = tryCatch(async (req, res) => {
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
});
