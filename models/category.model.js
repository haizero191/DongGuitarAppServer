const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  Name: {type: String, lowercase: true},
  CreatedAt: { type: Date, default: Date.now },
  SubCategory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "sub_category",
  }]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
