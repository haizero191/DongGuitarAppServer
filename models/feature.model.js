const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  Name: { type: String, require: true },
  IsActive: { type: Boolean, default: false },
  Level: { type: Number, required: false, default: 0 },
  CreatedAt: { type: Date, default: Date.now },
});

const Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;
