const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  Name: {type: String, lowercase: true},
  ImageUrl: String,
  Description: String,
  CreatedAt: { type: Date, default: Date.now },
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
