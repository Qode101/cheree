const productModel = require("../models/product.Model");
const categoryModel = require("../models/category.Model");
const { handleImageUpload } = require("../utils/upload");
const {
  checkIdExists,
  getProductUpdateFields,
  updateProduct,
} = require("../utils/utilites");
const { tryCatch, AppError } = require("../utils/tryCatch");

// Create a new product
exports.createProduct = tryCatch(async (req, res) => {
  let { category, ...product } = req.body;
  if (category) {
    await checkIdExists(category, categoryModel);
  }

  const optimizeUrl = await handleImageUpload(req.files, product.name);

  const product_ = {
    ...productData,
    category,
    imageUrl: optimizeUrl,
  };

  const newProduct = await productModel.create(product_);
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
  const product = await checkIdExists(req.params.id, productModel);
  const updateFields = await getProductUpdateFields(req.body, req.files);
  const updatedProduct = await updateProduct(product, updateFields);
  res.status(200).json(updatedProduct);
});

//delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const id = await checkIdExists(req.params.id, productModel);
    await productModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product has been deleted" });
  } catch (err) {
    res.status(404).json({ message: "Product not found" });
  }
};

//find a product by name
const findProductByName = async (name) => {
  const product = await productModel.find().byName(name);
  if (!product) {
    throw new AppError(`Product "${name} " doesnt exist`, 404);
  }
  return product;
};

//find a product by category
const findProductByCategory = async (category) => {
  const categoryFound = await categoryModel.find({ name: category });

  if (!categoryFound) {
    throw new AppError(`Category "${category} " not found`, 404);
  }
  const product = await productModel.find({ category: categoryFound._id });
  if (!product) {
    throw new AppError(`Product "${name} " doesnt exist`, 404);
  }
  return product;
};

const findProductByPrice = async (price) => {
  const actualPrice = parseFloat(price);

  if (isNaN(actualPrice)) {
    console.log("price", actualPrice);
    throw new AppError(`Invalid price ${price}`, 400);
  }
  const product = await productModel.find({ price: actualPrice });
  if (!product) {
    throw new AppError(`Product "${actualPrice} " doesnt exist`, 404);
  }
  return product;
};

exports.find = tryCatch(async (req, res) => {
  const queryHandlerMap = {
    name: findProductByName,
    category: findProductByCategory,
    price: findProductByPrice,
  };

  const queryKey = Object.keys(req.query)[0];
  const queryValue = req.query[queryKey];

  if (!queryKey) {
    return res.status(400).json({ message: "No query found" });
  }

  if (!queryHandlerMap[queryKey]) {
    return res.status(400).json({ message: "Invalid query" });
  }

  const products = await queryHandlerMap[queryKey](queryValue);
  res.status(200).json(products);
});

//find a product by price

//get all products
exports.getAllProducts = tryCatch(async (req, res) => {
  const products = await productModel.find();
  res.status(200).json(products);
});
<<<<<<< HEAD
=======

//get all products
exports.getAllProducts = tryCatch(async (req, res) => {
  const products = await productModel.find();
  res.status(200).json(products);
});
>>>>>>> 30f35b0fda99e473994398c8ff5fc77f727e033b
