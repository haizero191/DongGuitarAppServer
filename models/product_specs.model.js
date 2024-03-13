const mongoose = require('mongoose');

const productSpecs_Schema = new mongoose.Schema({
  Next: { type: String, required: false },
  Back: { type: String, required: false },
  Top: { type: String, required: false },
  EQ: { type: String, required: false },
  Material: { type: String, required: false },
  Condition: { type: String, required: false },
  String_type: { type: String, required: false },
  Timbre: { type: String, required: false }
});

const Product_specs = mongoose.model('Product_specs', productSpecs_Schema);

module.exports = Product_specs;
