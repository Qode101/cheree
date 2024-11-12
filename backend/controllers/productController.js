const productModel = require("../models/product.Model");
const categoryModel = require("../models/category.Model");
const { uploadOptimizeImage } = require("../utils/upload");

exports.createP = async (req, res) => {
  console.log(req.body, 434343, req.files);
  res.status(200).json({ message: "Products created" });
};

// Create a new product
exports.createProduct = async (req, res) => {
  let product = req.body;
  //console.log(434343, req.files);
  try {
    // Upload the image to Cloudinary if an image file exists in the request
    if (req.files) {
      console.log(23232);

      let imagePath =
        "https://res.cloudinary.com/demo/image/upload/v1651585298/happy_people.jpg";
      const optimizeUrl = await uploadOptimizeImage(imagePath);

      product = {
        ...req.body,
        imageUrl: optimizeUrl,
      };
    }

    const newProduct = await productModel.create(product);
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
      ...updateFields,
    };
  }

  if (req.files) {
    let imagePath =
      "https://res.cloudinary.com/demo/image/upload/v1651585298/happy_people.jpg";
    const optimizeUrl = await uploadOptimizeImage(imagePath);

    updateFields = {
      ...updateFields,
      imageUrl: optimizeUrl,
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
  const price = parseFloat(req.params.price);

  if (isNaN(price)) {
    return res.status(400).json({ message: "Invalid price" });
  }

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
