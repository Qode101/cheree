const categoryModel = require("../models/category.Model");
const { handleImageUpload } = require("../utils/upload");
const { tryCatch, AppError } = require("../utils/tryCatch");

// Create a new category
exports.createCategory = tryCatch(async (req, res) => {
  let category = req.body;
  // Upload the image to Cloudinary if an image file exists in the request
  const imageUrl = await handleImageUpload(req.files, category.name);
  console.log(imageUrl, 232222222);
  category = {
    ...category,
    imageUrl,
  };

  const newCategory = await categoryModel.create(category);
  res.status(201).json(newCategory);
});

// Read a category
exports.getCategory = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      throw new AppError("Category not found", 404);
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ message: "Category not found" });
  }
};

// Update a category
exports.updateCategory = tryCatch(async (req, res) => {
  let updateFields = req.body;

  const imageUpdateFields = await handleImageUpload(req.files);

  updateFields = { ...updateFields, ...imageUpdateFields };
  const updatedCategory = await categoryModel.findByIdAndUpdate(
    req.params.id,
    updateFields,
    { new: true }
  );
  if (!updatedCategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json(updatedCategory);
});

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
  return res.json(res.paginatedResults);
};

//find a category by name
exports.findCategoryByName = async (req, res) => {
  try {
    const category = await categoryModel.find().byName(req.params.name);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
