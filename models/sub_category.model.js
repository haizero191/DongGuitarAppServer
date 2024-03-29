const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  Name: {type: String, lowercase: true},
  CreatedAt: { type: Date, default: Date.now }
});

const SubCategory = mongoose.model('Sub_category', subCategorySchema);

module.exports = SubCategory;
