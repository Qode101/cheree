// check if id exists in the model
const { AppError } = require("./tryCatch");

exports.checkIdExists = async (id, model) => {
  try {
    const found = await model.findById(id);

    return true;
  } catch (error) {
    throw new AppError(`Id ${id} of doesn't exist`, 404);
  }
};
