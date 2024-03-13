const Product = require("../models/product.model.js");
const responseJSON = require("../config/responseJSON");
const Image = require("../models/image.model.js");
// Cloud setting
const fs = require("fs");
const { google } = require("googleapis");
const apikeys = require("../config/apiKey/apiKey.json");
const SCOPE = ["https://www.googleapis.com/auth/drive"];
const GoogleCloud = require("../config/GoogleCloud");
const { PassThrough } = require("stream");

class ImageController {
  async index(req, res) {

  
  }

  async detail(req, res) {
    var id = req.params.id
    try {
      var Detail_Image_Result = await Image.find({_id: id})
      res.json(responseJSON("Get image detail successfully !", Detail_Image_Result, true));
    } catch (error) {
      console.log(error)
      res.json(responseJSON("Get image failed !", null, false))
    }
  }

  async create(req, res) {
    try {
      const imageUploaded = req.body;
      const image = new Image();
      image.DriverId = imageUploaded.id;
      image.Url = imageUploaded.url;
      const savedImage = await image.save();
      res
        .status(200)
        .json(responseJSON("Image Create Successfully", savedImage, true));
    } catch (error) {
      res.status(201).json(responseJSON("Image Create Failed", null, false));
    }
  }

  async upload(req, res) {
    // Handle upload files
    const uploadFile = async (authClient) => {
      // Tạo client Drive API
      const drive = google.drive({ version: "v3", auth: authClient });
      // Chuẩn bị metadata cho file
      const fileMetadatas = req.files.map((fileData) => {
        return {
          name: fileData.originalname, // Hoặc cung cấp tên mong muốn khác
          parents: ["1z9Uh2LaMxPQpuqXZfSwChSx9rOf0Ry2F"], // Thay thế bằng ID thư mục đích
        };
      });
      // Sử dụng Multer và chuẩn bị luồng dữ liệu có thể đọc (tùy chọn)
      const buffers = req.files.map((fileData) => Buffer.from(fileData.buffer)); // Tạo Buffer từ dữ liệu nhận được
      const readableStreams = buffers.map((buffer) => {
        const readableStream = new PassThrough();
        readableStream.end(buffer);
        return readableStream;
      });
      // Upload the file
      try {
        const responses = await Promise.all(
          fileMetadatas.map((fileMetadata, index) => {
            return drive.files.create({
              resource: fileMetadata,
              media: {
                body: readableStreams[index], // Sử dụng readableStreams với Multer hoặc buffer trực tiếp
                chunkSize: 10485760,
              },
              fields: "id, webContentLink", // Chỉ trả về ID file và webContentLink
            });
          })
        );

        const uploadedFileIds = responses.map((response) => {
          // set shared permission for image
          const permissionResponse = drive.permissions.create({
            fileId: response.data.id,
            requestBody: {
              role: "reader",
              type: "anyone",
              allowFileDiscovery: false,
            },
          });
          return {
            id: response.data.id,
            url: response.data.webContentLink,
          };
        });

        return {
          status: true,
          message: "Update successfully",
          data: uploadedFileIds,
        };
      } catch (err) {
        return {
          status: false,
          data: [],
        };
      }
    };

    var auth = await GoogleCloud.authorize();
    if (auth) {
      var uploadResult = await uploadFile(auth);
      if (uploadResult.status)
        res.json(
          responseJSON("Image Upload Successfully", uploadResult.data, true)
        );
      else
        res.json(responseJSON("Image Upload failed", uploadResult.data, false));
    } else {
      res.json(responseJSON("Image Upload failed", null, false));
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const dataUpdate = req.body;
    if (Object.keys(dataUpdate).length === 0) {
      res.status(404).json(responseJSON("Image updated failed", null, false));
    } else {
      try {
        var Update_Image_Result = await Image.findByIdAndUpdate(
          id,
          dataUpdate,
          { new: true }
        );
        res.json(
          responseJSON("Image updated success", Update_Image_Result, true)
        );
      } catch (error) {
        res.status(404).json(responseJSON("Image updated failed", null, false));
      }
    }
  }

  //   async detail(req, res) {
  //     try {
  //       const { id } = req.params;
  //       const product = await Product.findById(req.params.id)
  //         .populate("Brand")
  //         .populate("Category")
  //         .populate("Images");

  //       res.status(200).json(responseJSON("Get data product success !", product));
  //     } catch (error) {
  //       res
  //         .status(404)
  //         .json(
  //           responseJSON(
  //             "Cannot get data product with error: ${error.message}",
  //             null
  //           )
  //         );
  //     }
  //   }

  //   delete(req, res) {
  //     try {
  //       const productIdsToDelete = req.body; // Replace with your actual IDs
  //       Product.deleteMany({ _id: { $in: productIdsToDelete } })
  //         .then((deletedProduct) => {
  //           if (!deletedProduct) {
  //             return res
  //               .status(404)
  //               .json(
  //                 responseJSON(
  //                   "Cannot get data product with error: ${error.message}",
  //                   null
  //                 )
  //               );
  //           }
  //           res.json(responseJSON("Product deleted successfully", null));
  //         })
  //         .catch((error) => {
  //           console.error("Error deleting product", error);
  //           res.status(500).json(responseJSON("Had error", null));
  //         });
  //     } catch (error) {
  //       console.error("Error creating product", error);
  //       res.status(500).json({ error: "An error occurred" });
  //     }
  //   }

  async driveDel(req, res) {
    const fileId = req.body.id;
    const deleteFile = async (authClient) => {
      // Tạo client Drive API
      const drive = google.drive({ version: "v3", auth: authClient });
      try {
        var response = await drive.files.delete({ fileId });
        return {
          status: true,
          message: "Delete successfully",
          data: response,
        };
      } catch (error) {
        return {
          status: false,
          data: [],
        };
      }
    };

    var auth = await GoogleCloud.authorize();
    if (auth) {
      var deleteResult = await deleteFile(auth);
      if (deleteResult) {
        res.json(responseJSON("Image Deleted Successfully", null, true));
      }
    } else {
      res.json(responseJSON("Image Deleted Failed", null, false));
    }
  }
}

module.exports = new ImageController();
