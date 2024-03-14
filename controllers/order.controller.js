// const Category = require("../models/category.model.js");
// const Product = require("../models/product.model.js")
const Brand = require("../models/brand.model.js");
const Image = require("../models/image.model.js");
const mongoose = require("mongoose");
const responseJSON = require("../config/responseJSON");
const Order = require("../models/order.model.js");
const adminGetOrderMail = require("../utils/transporter/AdminGetOrderMail.js");
const userGetOrderMail = require("../utils/transporter/UserGetOrderMail.js");
const Product = require("../models/product.model.js");
const { uid } = require('uid');



class OrderController {
    async index(req, res) {
      var {status} = req.query
      var query = {}

      if(status) {
        query = {
          Status: { $regex: status, $options: "i" }
        }
      }

      try {
        var Get_Order_Result = await Order.find(query).sort("-CreatedAt").populate({
          path: "Product",
          select: "Name"
        })
        res.json(responseJSON("Get Orders success !", Get_Order_Result, true));
      }
      catch(error) {
        console.log(error);
        res.json(responseJSON("Get Orders had error ! ", [], false));
      }
    }

  async create(req, res) {
    var newOrder = req.body;
    if ("Status" in newOrder) {
      delete newOrder.Status;
    }
    
    const order = new Order(newOrder);
    order.Code = `DGT${uid().replace(/-/g, '').substring(0, 6).toUpperCase()}`;
    
    const product = await Product.find({ _id: req.body.Product }).populate("Brand").populate("Category");
    if (product[0]) {
      var Create_Order_Result = await order.save();
      if (Create_Order_Result) {
        var dataMail = req.body
        dataMail.Code = order.Code;
        dataMail.Product = {
            Name: product[0].Name,
            Brand: product[0].Brand.Name,
            Category: product[0].Category.Name
        }
        adminGetOrderMail(dataMail);
        userGetOrderMail(dataMail);
        res.json(responseJSON("Order created successfully!", Create_Order_Result, true));
      }
      else {
        responseJSON(`Order created failed with error ${error}!`, null, false)
      }
    } else {
      responseJSON(`Order created failed with error !`, null, false);
    }
  }

  //   async delete(req, res) {
  //     try {
  //       var ids = req.body;
  //       const response = await Brand.deleteMany({ _id: { $in: ids } });
  //       res
  //         .status(200)
  //         .json(responseJSON("Brands deleted successfully", response, true));
  //     } catch (error) {
  //       res
  //         .status(201)
  //         .json(responseJSON("Brands deleted failed", null, false));
  //     }
  //   }

    async update(req, res) {
      try {
        const id = req.params.id;
        const dataUpdate = req.body;
        console.log(dataUpdate)
        if (Object.keys(dataUpdate).length === 0) {
          res.status(404).json({ success: false, error: "Data update is empty" });
        } else {
          Order.findByIdAndUpdate(id, dataUpdate, { new: false })
            .then((updateOrder) => {
              if (!updateOrder) {
                res
                  .status(404)
                  .json(responseJSON("Update order failed !", null, false));
              }
              res.json(responseJSON("Order update successfully", updateOrder, true));
            })
            .catch((error) => {
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

module.exports = new OrderController();
