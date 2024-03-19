const mongoose = require("mongoose");




const orderSchema = new mongoose.Schema({
  Fullname: { type: String, required: true },
  Phone: { type: String, required: true },
  Email: { type: String, required: true },
  Product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  // Save product infomations ----------------
  ProductName: { type: String, required: true },
  BrandName: {type: String, required: true },
  CategoryName: {},
  PaymentCost: { type: Number, required: true },
  Status: {
    type: String,
    enum: ["Open", "Confirmed", "Paid", "Shipping" ,"Delivered" ,"Finished", "Canceled"],
    required: true,
    default: "Open"
  },
  Code: { type: String, required: true },
  IsReview: { type: Boolean, default: false },
  CreatedAt: { type: Date, default: Date.now },
  UpdateAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
