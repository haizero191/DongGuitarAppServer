// const Category = require("../models/category.model.js");
// const Product = require("../models/product.model.js")
const Brand = require("../models/brand.model.js");
const Image = require("../models/image.model.js");
const mongoose = require("mongoose");
const responseJSON = require("../config/responseJSON/index.js");

const Feature = require("../models/feature.model.js");

class FeaturedController {
  index(req, res) {
    var isActiveParams = req.query.isActive;
    if (isActiveParams) {
      Feature.find({ IsActive: true })
        .sort("-CreatedAt")
        .then((featured) => {
          res.json(responseJSON("Get Featured success !", featured, true));
        })
        .catch((error) => {
          console.log(error);
          res.json(responseJSON("Get Featured had error ! ", [], false));
        });
    } else {
      Feature.find()
        .sort("-CreatedAt")
        .then((featured) => {
          res.json(responseJSON("Get Featured success !", featured, true));
        })
        .catch((error) => {
          console.log(error);
          res.json(responseJSON("Get Featured had error ! ", [], false));
        });
    }
  }

  async create(req, res) {
    const featured = new Feature(req.body);
    try {
      var result = await featured.save();
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

  async delete(req, res) {
    try {
      var ids = req.body;
      const response = await Feature.deleteMany({ _id: { $in: ids } });
      res
        .status(200)
        .json(responseJSON("Feature deleted successfully", response, true));
    } catch (error) {
      res.status(201).json(responseJSON("Feature deleted failed", null, false));
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const dataUpdate = req.body;

      console.log(dataUpdate);

      if (Object.keys(dataUpdate).length === 0) {
        res.status(404).json({ success: false, error: "Data update is empty" });
      } else {
        Feature.findByIdAndUpdate(id, dataUpdate, { new: false })
          .then((featureUpdated) => {
            if (!featureUpdated) {
              res
                .status(404)
                .json(responseJSON("Update feature failed !", null, false));
            }
            res.json(
              responseJSON("Feature update successfully", featureUpdated, true)
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

module.exports = new FeaturedController();
