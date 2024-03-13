// const Category = require("../models/category.model.js");
// const Product = require("../models/product.model.js")
const Brand = require("../models/brand.model.js");
const Image = require("../models/image.model.js");
const mongoose = require("mongoose");
const responseJSON = require("../config/responseJSON");




class SenderController {
  index(req, res) {

    res.json("email send success")
  }
}

module.exports = new SenderController();
