const cloudinary = require("../config/cloudinaryConfig");

exports.uploadOptimizeImage = async (imagePath) => {
  const result = await cloudinary.uploader.upload();
  console.log(result, 1212112);

  if (!result.secure_url) {
    return res.status(500).json({ error: "Failed to upload image" });
  }

  return cloudinary.url(result.public_id, {
    fetch_format: "auto",
    quality: "auto",
  });
};
