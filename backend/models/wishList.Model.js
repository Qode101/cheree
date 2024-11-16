const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define wishList schema
const wishListSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      dateAdded: { type: Date, default: Date.now },
    },
  ],
  wishListDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WishList", wishListSchema);
