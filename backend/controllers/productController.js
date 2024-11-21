const productModel = require("../models/product.Model");
const categoryModel = require("../models/category.Model");
const { uploadOptimizeImage } = require("../utils/upload");
const { checkIdExists } = require("../utils/utilites");
const { tryCatch, AppError } = require("../utils/tryCatch");

// Create a new product
exports.createProduct = tryCatch(async (req, res) => {
  let { category, ...product } = req.body;

  if (category) {
    await checkIdExists(category, categoryModel);
  }

  // Upload the image to Cloudinary if an image file exists in the request
  if (req.files) {
    const name = product.name.trim();
    const imagePath = req.files.image.tempFilePath;
    const optimizeUrl = await uploadOptimizeImage(imagePath, name);

    product = {
      ...product,
      category,
      imageUrl: optimizeUrl,
    };
  }

  const newProduct = await productModel.create(product);
  res.status(201).json(newProduct);
});

//read a product
exports.getProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: "Product not found" });
  }
};

//update a product, if stockUpdate is passed in the body, it will update the stock
exports.updateProduct = tryCatch(async (req, res) => {
  let { category, ...updateFields } = req.body;
  if (category) {
    await checkIdExists(category, categoryModel);
    updateFields = {
      ...updateFields,
      category,
    };
  }

  // If stockUpdate is provided, increment the stock field
  if (req.body.stockUpdate) {
    updateFields = {
      $inc: { stock: req.body.stockUpdate },
      ...updateFields,
    };
  }

  if (req.files) {
    let imagePath = req.files.image.tempFilePath;
    const optimizeUrl = await uploadOptimizeImage(imagePath);

    updateFields = {
      ...updateFields,
      imageUrl: optimizeUrl,
    };
  }

  const updatedProduct = await productModel.findByIdAndUpdate(
    req.params.id,
    updateFields,
    { new: true }
  );

  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json(updatedProduct);
});

//delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const id = await checkIdExists(req.params.id, productModel);
    console.log(id, 3333);
    await productModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product has been deleted" });
  } catch (err) {
    res.status(404).json({ message: "Product not found" });
  }
};

//find a product by name
exports.findProductByName = tryCatch(async (req, res) => {
  const product = await productModel.find().byName(req.params.name);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json(product);
});

//find a product by category
exports.findProductByCategory = tryCatch(async (req, res) => {
  const category = await categoryModel.find({ name: req.params.category });

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  const product = await productModel.find({ category: category._id });
  res.status(200).json(product);
});

//find a product by price
exports.findProductByPrice = tryCatch(async (req, res) => {
  const price = parseFloat(req.params.price);

  if (isNaN(price)) {
    return res.status(400).json({ message: "Invalid price" });
  }
  const product = await productModel.find({ price: req.params.price });
  res.status(200).json(product);
});

//get all products
exports.getAllProducts = tryCatch(async (req, res) => {
  const products = await productModel.find();
  res.status(200).json(products);
});
