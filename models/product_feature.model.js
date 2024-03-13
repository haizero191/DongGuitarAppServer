const mongoose = require('mongoose');

const productFeatureSchema = new mongoose.Schema({
  Product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  Feature: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feature",
  },
  CreatedAt: { type: Date, default: Date.now },
});

const ProductFeature = mongoose.model('products-features', productFeatureSchema);

module.exports = ProductFeature;
