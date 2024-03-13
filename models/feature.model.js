const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  Name: { type: String, require: true },
  IsActive: { type: Boolean, default: false },
  CreatedAt: { type: Date, default: Date.now },
});

const Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;
