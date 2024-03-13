const mongoose = require("mongoose");
const ProductFeatured = require("../models/product_feature.model");
const responseJSON = require("../config/responseJSON");
const ProductFeature = require("../models/product_feature.model");

class ProductFeatureController {
  async index(req, res) {
    try {
      var response = ProductFeature.find().sort("-CreatedAt");
      if (response)
        res.json(
          responseJSON("Get Products featured successfully !", response, true)
        );
      else res.json(responseJSON(`Get Products featured failed`, null, false));
    } catch (error) {
      res.json(responseJSON(`Have error with code: ${error}`, null, false));
    }
  }

  async create(req, res) {
    const P_featured = new ProductFeatured(req.body);
    try {
      var result = await P_featured.save();
      res.json(responseJSON("Featured created successfully!", result, true));
    } catch (error) {
      res.json(
        responseJSON(
          `Featured created failed with error ${error}!`,
          null,
          false
        )
      );
    }
  }

  async getProductWithFeatureId(req, res) {
    var featureId = req.params.id;
    try {
      var Get_Product_Result = await ProductFeature.find({ Feature: featureId })
        .populate("Feature")
        .populate("Product")
      res.json(
        responseJSON(
          "Get product with feature id successfully !",
          Get_Product_Result,
          true
        )
      );
    } catch (error) {
      console.log(error);
      res.json(responseJSON("Get product with feature id failed !", [], false));
    }
  }

  async delete(req, res) {
    var featureId = req.body.feature;
    var productId = req.body.product;
    try {
      const response = await ProductFeature.deleteOne({
        Feature: featureId,
        Product: productId,
      });
      res
        .status(200)
        .json(
          responseJSON("Product feature deleted successfully", response, true)
        );
    } catch (error) {
      console.log(error)
      res.status(201).json(responseJSON("Product feature failed", null, false));
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
            res.json(
              responseJSON("Brand update successfully", updateBrand, true)
            );
          })
          .catch((error) => {
            console.error("Error updating product", error);
            res.status(500).json(responseJSON("Have error !", null, false));
          });
      }
    } catch (error) {
      res.status(201).json(responseJSON("Update brand failed !", null, false));
    }
  }
}

module.exports = new ProductFeatureController();
