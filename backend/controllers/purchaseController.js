const purchaseModel = require("../models/purchase.Model");
const { checkIdExists } = require("../utils/utilites");
// Get all purchases
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await purchaseModel.find().populate(products);
    res.status(200).json(purchases);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get purchase by ID
exports.getPurchaseById = async (req, res) => {
  try {
    const purchase = await purchaseModel.findById(req.params.id).populate(products);
    res.status(200).json(purchase);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get purchase by user
exports.getPurchaseByUser = async (req, res) => {
  try {
    const purchase = await purchaseModel.find({ user: req.params.id }).populate(products);
    res.status(200).json(purchase);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create purchase
exports.createPurchase = async (req, res) => {
  const { products, amount, user } = req.body;
  //check if all products exist
  products.forEach(async (product) => {
    await checkIdExists(product.product, productModel);
  });

  const newPurchase = new purchaseModel({ user, products, amount });
  try {
    await newPurchase.save();
    res.status(201).json(newPurchase);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update purchase
exports.updatePurchase = async (req, res) => {
  try {
    await purchaseModel.findByIdAndUpdate(
      req.body.id,
      req.body,
      { new: true },
      (error, updatedPurchase) => {
        if (error) {
          res.status(500).json({ message: error.message });
        } else {
          res.status(200).json(updatedPurchase);
        }
      }
    );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete purchase
exports.deletePurchase = async (req, res) => {
  try {
    await purchaseModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
