const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create a new schema for our product data
const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  stock: { type: Number, required: true },
  stockAvailbility: { type: Boolean, default: true },
  image: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
