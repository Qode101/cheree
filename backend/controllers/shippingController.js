const shippingModel = require("../models/shipping.Model");
const { tryCatch } = require("../utils/tryCatch");
const checkIdExists = require("../utils/utilites");

// Create a new shipping
exports.createShipping = tryCatch(async (req, res) => {
  let shippingFields = req.body;
  const { user } = req;
  shippingFields = { ...shippingFields, user: user._id };

  const newShipping = await shippingModel.create(req.body);
  res.status(201).json(newShipping);
});

// update shipping status
exports.updateShipping = tryCatch(async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  await checkIdExists(id, shippingModel);

  const updatedShipping = await shippingModel.findByIdAndUpdate(
    id,
    { update },
    { new: true }
  );

  res.status(200).json(updatedShipping);
});

// get all shippings
exports.getAllShippings = tryCatch(async (req, res) => {
  const shippings = await shippingModel.find();
  res.status(200).json(shippings);
});

// get shipping by id
exports.getShippingById = tryCatch(async (req, res) => {
  const { id } = req.params;

  await checkIdExists(id, shippingModel);

  const shipping = await shippingModel.findById(id);
  res.status(200).json(shipping);
});

// delete shipping
exports.deleteShipping = tryCatch(async (req, res) => {
  const { id } = req.params;

  await checkIdExists(id, shippingModel);

  await shippingModel.findByIdAndDelete(id);
  res.status(204).json(null);
});
