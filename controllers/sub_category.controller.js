const Category = require("../models/category.model.js");
const mongoose = require("mongoose");
const responseJSON = require("../config/responseJSON");
const SubCategory = require("../models/sub_category.model.js");

class SubCategoryController {
  index(req, res) {

    SubCategory.find()
      .then((category) => {
        res.json(responseJSON("Get categories success !", category, true));
      })
      .catch((error) => {
        console.log(error);
        res.json(responseJSON("Get categories failed !", [], false));
      });
  }

  async create(req, res) {
    const subCategory = new SubCategory(req.body);
    try {
      var result = await subCategory.save();
      res.json(
        responseJSON("sub-category created successfully!", result, true)
      );
    } catch (error) {
      res.json(
        responseJSON(
          `sub-category created failed with error ${error}!`,
          null,
          false
        )
      );
    }
  }

  async delete(req, res) {
    try {
      var subCateIds = req.body;
      const response = await SubCategory.deleteMany({
        _id: { $in: subCateIds },
      });
      res
        .status(200)
        .json(
          responseJSON("Sub-Category deleted successfully", response, true)
        );
    } catch (error) {
      res
        .status(201)
        .json(responseJSON("Sub-Category deleted failed", null, false));
    }
  }

  async update(req, res) {
    try {
      const subCategoryId = req.params.id;
      const dataUpdate = req.body;

      console.log(dataUpdate)
      if (Object.keys(dataUpdate).length === 0) {
        res.status(404).json({ success: false, error: "Data update is empty" });
      } else {
        SubCategory.findByIdAndUpdate(subCategoryId, dataUpdate, { new: false })
          .then((updatedSubCategory) => {
            if (!updatedSubCategory) {
              res
                .status(404)
                .json({ success: true, error: "Sub-Category not found" });
            }
            res.json({
              success: true,
              message: "Sub-Category updated successfully",
            });
          })
          .catch((error) => {
            console.error("Error updating Data", error);
            res
              .status(500)
              .json({ success: false, error: "An error occurred" });
          });
      }
    } catch (error) {
      res
        .status(201)
        .json(responseJSON("Sub-Category updated failed", null, false));
    }
  }
}

module.exports = new SubCategoryController();
