const cloudinary = require("../config/cloudinaryConfig");
const { AppError } = require("./tryCatch");

exports.uploadOptimizeImage = async (imagePath, name) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      public_id: name,
    });

    if (!result.secure_url) {
      throw new AppError("Failed to upload image", 400);
    }
    return cloudinary.url(result.public_id, {
      fetch_format: "auto",
      quality: "auto",
    });
  } catch (error) {
    console.error(error);
    throw new AppError(error.message || "Failed to upload image", 400);
  }
};
