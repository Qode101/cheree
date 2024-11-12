const categoryModel = require("../models/category.Model");
const { uploadOptimizeImage } = require("../utils/upload");

// Create a new category
exports.createCategory = async (req, res) => {
  let category = req.body;
  try {
    // Upload the image to Cloudinary if an image file exists in the request
    if (req.files) {
      let imagePath =
        "https://res.cloudinary.com/demo/image/upload/v1651585298/happy_people.jpg";
      const optimizeUrl = await uploadOptimizeImage(imagePath);

      category = {
        ...category,
        imageUrl: optimizeUrl,
      };
    }
    const newCategory = await categoryModel.create(category);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read a category
exports.getCategory = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  let updateFields = req.body;

  try {
    if (req.files) {
      let imagePath =
        "https://res.cloudinary.com/demo/image/upload/v1651585298/happy_people.jpg";
      const optimizeUrl = await uploadOptimizeImage(imagePath);
      updateFields = {
        ...updateFields,
        imageUrl: optimizeUrl,
      };
    }
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true },
      (error, category) => {
        if (error) {
          res.status(500).json({ message: error.message });
        } else {
          res.status(200).json(category);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    await categoryModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// view all categories
exports.viewAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//find a category by name
exports.findCategoryByName = async (req, res) => {
  try {
    const category = await categoryModel.find({ name: req.params.name });
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
