// check if id exists in the model
exports.checkIdExists = async (id, model) => {
  const found = await model.findById(id);
  if (!found) {
    throw new Error(`Id of ${model} not found: ${id}`);
  }
  return true;
};

// check if pass
