const { mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  PurchasePrice: { type: Number, required: true },
  SellingPrice: { type: Number, required: true },
  Quantity: Number,
  Description: String,
  Alias: { type: String, required: false },
  Brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    lowercase: true,
    trim: true,
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    lowercase: true,
    trim: true,
  },
  SubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sub_category"
  },
  Video: { type: String, required: false },
  Images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
  CreatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
