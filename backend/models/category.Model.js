const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  image: { type: String },
});

module.exports = mongoose.model("Category", categorySchema);
