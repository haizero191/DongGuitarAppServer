const Category = require("../models/category.model.js");
const mongoose = require("mongoose");
const responseJSON = require("../config/responseJSON");

class CategoryController {
  index(req, res) {
    Category.find()
      .then((category) => {
        res.json(responseJSON("Get categories success !", category, true));
      })
      .catch((error) => {
        console.log(error);
        res.json(responseJSON("Get categories failed !", [], false));
      });
  }

  async create(req, res) {
    const category = new Category(req.body);
    try {
      var result = await category.save();
      res.json(responseJSON("Category created successfully!", result, true));
    } catch (error) {
      res.json(
        responseJSON(
          `Category created failed with error ${error}!`,
          null,
          false
        )
      );
    }
  }

  async delete(req, res) {
    try {
      var cateIds = req.body;
      const response = await Category.deleteMany({ _id: { $in: cateIds } });
      res
        .status(200)
        .json(responseJSON("Categories deleted successfully", response, true));
    } catch (error) {
      res
        .status(201)
        .json(responseJSON("Categories deleted failed", null, false));
    }
  }

  async update(req, res) {
    try {
      const categoryId = req.params.id;
      const dataUpdate = req.body;

      if (Object.keys(dataUpdate).length === 0) {
        res.status(404).json({ success: false, error: "Data update is empty" });
      } else {
        Category.findByIdAndUpdate(categoryId, dataUpdate, { new: false })
          .then((updatedCategory) => {
            if (!updatedCategory) {
              res
                .status(404)
                .json({ success: true, error: "Product not found" });
            }
            res.json({
              success: true,
              message: "Category updated successfully",
            });
          })
          .catch((error) => {
            console.error("Error updating product", error);
            res
              .status(500)
              .json({ success: false, error: "An error occurred" });
          });
      }
    } catch (error) {
      res
        .status(201)
        .json(responseJSON("Categories updated failed", null, false));
    }
  }
}

module.exports = new CategoryController();
