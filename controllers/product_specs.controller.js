const Product_specs = require("../models/product_specs.model.js");
const responseJSON = require("../config/responseJSON");

// Cloud setting
const { google } = require("googleapis");
const GoogleCloud = require("../config/GoogleCloud");

class ProductSpecsController {

  async index(req, res) {
    var productId = req.query.productId;
    if(productId) {
      try {
        var response = await Product_specs.find({Product: {$in : [productId]}});

        res.json(
          responseJSON("Get Products specs successfully !", response, true)
        );
         
      } catch (error) {
        res.json(responseJSON(`Have error with code: ${error}`, null, false));
      }
    }
    else {
      res.json(responseJSON(`No information for get this data`, null, false));
    }
  }

  async create(req, res) {
    try {
      const product_specs = new Product_specs(req.body);
      const savedResult = await product_specs.save();
      res
        .status(200)
        .json(
          responseJSON("A new product specs was created !", savedResult, true)
        );
    } catch (error) {
      res.status(400).json("The request is invalid !");
    }
  }

  async update(req, res) {
    const productSpecsId = req.params.id;
    const productSpecsData = req.body;
    if (Object.keys(productSpecsData).length === 0) {
      res.status(404).json(responseJSON("Data update is empty !", null, false));
    } else {
      Product_specs.findByIdAndUpdate(productSpecsId, productSpecsData, {
        new: false,
      })
        .then((updatedProductSpecs) => {
          if (!updatedProductSpecs) {
            res
              .status(404)
              .json(responseJSON("Product secifications update not found !", null, false));
          }
          res.json(responseJSON("Product secifications update success !", null, true));
        })
        .catch((error) => {
          res.status(500).json(responseJSON("Have error !", null, false));
        });
    }
  }

  async delete(req, res) {
    var productSpecsIds = req.body;

    try {
      const response = await Product_specs.deleteMany({
        _id: { $in: productSpecsIds },
      });
      res
        .status(200)
        .json(
          responseJSON("product-specs deleted successfully", response, true)
        );
    } catch (error) {
      res
        .status(201)
        .json(responseJSON("product-specs deleted failed", null, false));
    }
  }


  async deleteWithProductId(req, res) {
    var productIds = req.body;
    try {
      const Delete_ProductSpecs_Result = await Product_specs.deleteMany({
        Product: { $in: productIds },
      });
      res.status(200).json(
        responseJSON("product-specs deleted successfully", Delete_ProductSpecs_Result, true)
      );
    }
    catch(error) {
      res
      .status(201)
      .json(responseJSON("product-specs deleted failed", null, false));
    }
  }

  

}

module.exports = new ProductSpecsController();
