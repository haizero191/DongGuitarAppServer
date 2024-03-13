const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  DriverId: String,
  Url: String,
  CreatedAt: { type: Date, default: Date.now },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
