const productModel = require("../models/product.Model");
const categoryModel = require("../models/category.Model");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await productModel.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//read a product
exports.getProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//update a product, if stockUpdate is passed in the body, it will update the stock
exports.updateProduct = async (req, res) => {
  let updateFields = req.body;

  // If stockUpdate is provided, increment the stock field
  if (req.body.stockUpdate) {
    updateFields = {
      $inc: { stock: req.body.stockUpdate },
      ...req.body,
    };
  }

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete a product
exports.deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//find a product by name
exports.findProductByName = async (req, res) => {
  try {
    const product = await productModel.find({ name: req.params.name });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//find a product by category
exports.findProductByCategory = async (req, res) => {
  const category = await categoryModel.find({ name: req.params.category });

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  try {
    const product = await productModel.find({ category: category._id });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//find a product by price
exports.findProductByPrice = async (req, res) => {
  try {
    const product = await productModel.find({ price: req.params.price });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//view all products in the database
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
