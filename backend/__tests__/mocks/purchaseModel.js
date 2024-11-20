const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  products: [
    {
      product: mongoose.Schema.Types.ObjectId,
      quantity: Number
    }
  ],
  amount: Number,
  purchaseDate: Date
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase; 