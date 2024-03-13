// const Category = require("../models/category.model.js");
// const Product = require("../models/product.model.js")
const Brand = require("../models/brand.model.js");
const Image = require("../models/image.model.js");
const mongoose = require("mongoose");
const responseJSON = require("../config/responseJSON");

class BrandController {
  index(req, res) {
    Brand.find()
      .sort("-CreatedAt")
      .then((brand) => {
        res.json(responseJSON("Get Brands success !", brand, true));
      })
      .catch((error) => {
        console.log(error);
        res.json(responseJSON("Get Brands had error ! ", [], false));
      });
  }

  async create(req, res) {
    const brand = new Brand(req.body);
    try {
      var result = await brand.save();
      res.json(responseJSON("Brand created successfully!", result, true));
    } catch (error) {
      res.json(
        responseJSON(`Brand created failed with error ${error}!`, null, false)
      );
    }
  }

  async delete(req, res) {
    try {
      var ids = req.body;
      const response = await Brand.deleteMany({ _id: { $in: ids } });
      res
        .status(200)
        .json(responseJSON("Brands deleted successfully", response, true));
    } catch (error) {
      res
        .status(201)
        .json(responseJSON("Brands deleted failed", null, false));
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const dataUpdate = req.body;

      if (Object.keys(dataUpdate).length === 0) {
        res.status(404).json({ success: false, error: "Data update is empty" });
      } else {
        Brand.findByIdAndUpdate(id, dataUpdate, { new: false })
          .then((updateBrand) => {
            if (!updateBrand) {
              res
                .status(404)
                .json(responseJSON("Update brand failed !", null, false));
            }
            res.json(responseJSON("Brand update successfully", updateBrand, true));
          })
          .catch((error) => {
            console.error("Error updating product", error);
            res
              .status(500)
              .json(responseJSON("Have error !", null, false));
          });
      }
    } catch (error) {
      res
        .status(201)
        .json(responseJSON("Update brand failed !", null, false));
    }
  }
}

module.exports = new BrandController();
