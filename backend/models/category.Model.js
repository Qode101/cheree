const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  imageUrl: { type: String },
});

// query help to find catergory by name
categorySchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

module.exports = mongoose.model("Category", categorySchema);
