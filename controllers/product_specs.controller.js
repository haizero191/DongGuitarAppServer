const Product_specs = require("../models/product_specs.model.js");
const responseJSON = require("../config/responseJSON");

// Cloud setting
const { google } = require("googleapis");
const GoogleCloud = require("../config/GoogleCloud");

class ProductSpecsController {
  async index(req, res) {
    res.json("Updating....");
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

  // async detail(req, res) {
  //   res.json("updating...")
  // }

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

  // async delete(req, res) {
  //   // Xử lí xóa hình ảnh trong drive
  //   const deleteFileDrive = async (ids) => {
  //     const deleteFile = async (authClient) => {
  //       // Tạo client Drive API
  //       const drive = google.drive({ version: "v3", auth: authClient });
  //       try {
  //         const responses = await Promise.all(
  //           ids.map((fileId, index) => {
  //             return drive.files.delete({ fileId });
  //           })
  //         );

  //         return {
  //           status: true,
  //           message: "Delete successfully",
  //           data: responses,
  //         };
  //       } catch (error) {
  //         console.log(error);
  //         return {
  //           status: false,
  //           data: [],
  //         };
  //       }
  //     };
  //     var auth = await GoogleCloud.authorize();
  //     if (auth) {
  //       var deleteResult = await deleteFile(auth);
  //       if (deleteResult.status === true) {
  //         return {
  //           success: true,
  //           message: "File deleted",
  //         };
  //       }
  //     } else {
  //       return {
  //         success: false,
  //         message: "Can't Authorization GoogleCloud",
  //       };
  //     }
  //   };

  //   try {
  //     var productIds = req.body;
  //     // Lấy danh sách các sản phẩm dựa trên các ID đã cho
  //     const products = await Product.find({ _id: { $in: productIds } });
  //     // Lặp qua danh sách sản phẩm và xóa hình ảnh liên quan
  //     for (let i = 0; i < products.length; i++) {
  //       const product = products[i];
  //       const imageIds = product.Images;
  //       const driveIds = (await Image.find({ _id: { $in: imageIds } })).map(
  //         (image) => image.DriverId
  //       );
  //       // Xóa các hình ảnh trong bộ sưu tập "image" với các ID đã lấy được.
  //       await Image.deleteMany({ _id: { $in: imageIds } });

  //       // Xóa hình ảnh trong drive
  //       deleteFileDrive(driveIds);
  //     }
  //     // Xóa các sản phẩm trong bộ sưu tập "product"
  //     await Product.deleteMany({ _id: { $in: productIds } });
  //     res
  //       .status(200)
  //       .json(responseJSON("Product deleted successfully", null, true));
  //   } catch (error) {
  //     res.status(200).json(responseJSON("Product deleted failed", null, false));
  //   }
  // }
}

module.exports = new ProductSpecsController();
