const purchaseModel = require("../models/purchase.Model");
const { checkIdExists } = require("../utils/utilites");
const { tryCatch, AppError } = require("../utils/tryCatch");

// Get all purchases
exports.getAllPurchases = tryCatch(async (req, res) => {
  const purchases = await purchaseModel.find().populate("products");
  res.status(200).json(purchases);
});

// Get purchase by ID
exports.getPurchaseById = tryCatch(async (req, res) => {
  const purchase = await purchaseModel
    .findById(req.params.id)
    .populate("products");

  if (!purchase) {
    throw new AppError("Purchase not found", 404);
  }

  res.status(200).json(purchase);
});

// get purchase by user
exports.getPurchaseByUser = tryCatch(async (req, res) => {
  const purchase = await purchaseModel
    .find({ user: req.params.id })
    .populate(products);
  res.status(200).json(purchase);
});

// Create purchase

exports.createPurchase = tryCatch(async (req, res) => {
  const { products, amount, user } = req.body;
  //check if all products exist
  products.forEach(async (product) => {
    await checkIdExists(product.product, productModel);
  });
  const newPurchase = new purchaseModel({ user, products, amount });
  await newPurchase.save();
  res.status(201).json(newPurchase);
});

// Update purchase
exports.updatePurchase = tryCatch(async (req, res) => {
  const updatedPurchase = await purchaseModel.findByIdAndUpdate(
    req.body.id,
    req.body,
    { new: true }
  );

  if (!updatedPurchase) {
    throw new Error("Purchase not found");
  }

  res.status(200).json(updatedPurchase);
});

// Delete purchase
exports.deletePurchase = tryCatch(async (req, res) => {
  await purchaseModel.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Purchase deleted successfully" });
});
