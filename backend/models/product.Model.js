const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create a new schema for our product data
const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  stock: { type: Number, required: true },
  stockAvailbility: { type: Boolean, default: true },
  imageUrl: {
    type: String,
    validate: {
      validator: function (url) {
        return /^https?:\/\/.*$/.test(url);
      },
      message: "Invalid URL",
    },
  },
  createdAt: { type: Date, default: Date.now },
});

// how to change the availability of stock if the stock is 0 and below
productSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("stock")) {
    this.stockAvailbility = this.stock > 0;
  }
  next();
});

// query helper to find product by name
productSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

module.exports = mongoose.model("Product", productSchema);
