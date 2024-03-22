const mongoose = require('mongoose');

const productSpecs_Schema = new mongoose.Schema({
  Product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  Name: { type: String, require: false },
  Description: { type: String, require: false },

  CreatedAt: { type: Date, default: Date.now },
});

const Product_specs = mongoose.model('Product-Specs', productSpecs_Schema);

module.exports = Product_specs;
