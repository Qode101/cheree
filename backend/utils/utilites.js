// check if id exists in the model
const { AppError } = require("./tryCatch");
const categoryModel = require("../models/category.Model");
const { handleImageUpload } = require("./upload");

exports.checkIdExists = async (id, model) => {
  try {
    return await model.findById(id);
  } catch (error) {
    throw new AppError(`Id ${id} of doesn't exist`, 404);
  }
};

exports.getProductUpdateFields = async (body, files) => {
  const { category, stockUpdate, ...updateFields } = body;

  if (category) {
    await checkIdExists(category, categoryModel);
    updateFields.category = category;
  }
  const stockUpdateFields = handleStockUpdates(stockUpdate);
  console.log(stockUpdateFields, 4444);
  const imageUpdateFields = await handleImageUpload(files);

  return {
    ...updateFields,
    ...stockUpdateFields,
    ...imageUpdateFields,
  };
};

const handleStockUpdates = (stockUpdate) => {
  if (!stockUpdate) {
    return {};
  }
  const stockUpdateNumber = parseInt(stockUpdate);
  if (isNaN(stockUpdateNumber)) {
    throw new AppError("Stock update must be a number", 400);
  }
  return { $inc: { stock: stockUpdateNumber } };
};

exports.updateProduct = async (product, updateFields) => {
  try {
    // Set the new update fields on the product
    if (updateFields.$inc && updateFields.$inc.stock) {
      product.stock += updateFields.$inc.stock;
      delete updateFields.$inc;
    }
    product.set(updateFields);
    await product.save();

    return product; // Return the updated product
  } catch (error) {
    throw new Error(`Failed to update product: ${error.message}`);
  }
};
