const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define shipping schema
const shippingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  purchase: { type: Schema.Types.ObjectId, ref: "Purchase" },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered"],
    default: "Pending",
  },
  city: { type: String, required: true },
  country: { type: String, default: "Kenya" }, // default to Kenya
  shippingCompany: { type: String },
  trackingNumber: { type: String },
  cost: { type: Number, required: true },
  shippingDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// set tracking number to id
shippingSchema.pre("save", function (next) {
  if (!this.trackingNumber) {
    this.trackingNumber = this._id.toString();
  }
  updateAt = Date.now();

  next();
});

module.exports = mongoose.model("Shipping", shippingSchema);
