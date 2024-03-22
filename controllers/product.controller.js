const Product = require("../models/product.model.js");
const responseJSON = require("../config/responseJSON");
const Image = require("../models/image.model.js");
const Brand = require("../models/brand.model.js");
const Category = require("../models/category.model.js");

// Cloud setting
const { google } = require("googleapis");
const GoogleCloud = require("../config/GoogleCloud");
const Product_specs = require("../models/product_specs.model.js");
const ProductFeature = require("../models/product_feature.model.js");
const SubCategory = require("../models/sub_category.model.js");

class ProductController {
  async index(req, res) {
    // init variables
    let { page, limit, filter } = req.query;
    let skip = 0;
    var sortValue = { CreateAt: -1 };

    // Kiểm tra pagination
    if (page && limit) skip = (page - 1) * limit;
    else {
      page = 1;
      limit = 9;
    }

    // Kiểm tra sort by
    if (filter && filter.sortBy) {
      if (filter.sortBy === "incs") {
        sortValue["SellingPrice"] = 1;
      } else if (filter.sortBy === "desc") {
        sortValue["SellingPrice"] = -1;
      }
    }

    if (filter && filter.search) {
      try {
        var Search_Product_Result = await Product.find({
          Name: { $regex: filter.search, $options: "i" },
        })
          .sort({ ...sortValue })
          .skip(skip)
          .limit(limit)
          .populate("Brand")
          .populate("Category")
          .populate("Images")
          .populate("SubCategory");
        if (Search_Product_Result) {
          var Search_Count_Product_Result = await Product.find({
            Name: { $regex: filter.search, $options: "i" },
          }).countDocuments();
          res.json({
            success: true,
            data: Search_Product_Result,
            navigate: {
              page: page,
              limit: limit,
              totalPage: Math.ceil(Search_Count_Product_Result / limit),
              productCount: Search_Count_Product_Result,
            },
          });
        } else {
          res.json(responseJSON("Product find result: ", [], true));
        }
      } catch (error) {
        console.log(error);
        res.json(responseJSON("Product find had error: ", null, false));
      }
    } else if (filter) {
      var query = {};
      var queryArr = []

      // Filter with only brand
      if (filter.brand) {
        const brand = await Brand.find({ Name: { $in: filter.brand } })
          .select("_id")
          .lean();
        if (brand) {
          queryArr.push({ Brand: { $in: brand } })
        }
      }

      // Filter with only category
      if (filter.category) {
        const category = await Category.find({ Name: { $in: filter.category } })
          .select("_id")
          .lean();

        if (category) {
          if (filter.category){
            queryArr.push({ Category: { $in: category } })
          } 
        }
      }

      // Filter with only category
      if (filter.subCategory) {
        const subCate = await SubCategory.find({ Name: { $in: filter.subCategory } })
          .select("_id")
          .lean();
  
        if (subCate) {
          if (filter.subCategory){
            queryArr.push({ SubCategory: { $in: subCate } })
          } 
        }
      }

      query = {
        $and: queryArr,
      };

      // Filter with only brand and category
      // if (filter.brand && filter.category) {
      //   const brand = await Brand.find({ Name: { $in: filter.brand } })
      //     .select("_id")
      //     .lean();
      //   const category = await Category.find({ Name: { $in: filter.category } })
      //     .select("_id")
      //     .lean();

      //   if (category && brand) {
         
      //   }
      // }

      

      // Handle filter and response data
      Product.find(query)
        .sort({ ...sortValue })
        .skip(skip)
        .limit(limit)
        .populate("Brand")
        .populate("Category")
        .populate("Images")
        .populate("SubCategory")
        .then((products) => {
          Product.find(query)
            .countDocuments()
            .then((result) => {
              res.json({
                success: true,
                data: products,
                navigate: {
                  page: page,
                  limit: limit,
                  totalPage: Math.ceil(result / limit),
                  productCount: result,
                },
              });
            });
        })
        .catch((error) => {
          res.json({ success: false, data: [] });
        });
    } else if (!filter) {
      Product.find()
        .sort(sortValue)
        .skip(skip)
        .limit(limit)
        .populate("Brand")
        .populate("Category")
        .populate("Images")
        .populate("SubCategory")
        .then((products) => {
          Product.find()
            .countDocuments()
            .then((result) => {
              res.json({
                success: true,
                data: products,
                navigate: {
                  page: page,
                  limit: limit,
                  totalPage: Math.ceil(result / limit),
                  productCount: result,
                },
              });
            });
        })
        .catch((error) => {
          res.json({ success: false, data: [] });
        });
    }
  }

  async create(req, res) {
    try {
      const product = new Product(req.body);
      if (product.Name)
        product.Alias = product.Name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      // Save product to database
      const savedProduct = await product.save();
      res
        .status(201)
        .json(responseJSON("A new product was created !", savedProduct, true));
    } catch (error) {
      console.error("Error creating product", error);
      res.status(400).json("The request is invalid !");
    }
  }

  async detail(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(req.params.id)
        .populate("Brand")
        .populate("Category")
        .populate("Images")
        .populate("SubCategory");

      res
        .status(200)
        .json(responseJSON("Get data product success !", product, true));
    } catch (error) {
      res
        .status(404)
        .json(
          responseJSON(
            "Cannot get data product with error: ${error.message}",
            null,
            false
          )
        );
    }
  }

  async update(req, res) {
    const productId = req.params.id;
    const productData = req.body;
    console.log(req.body);
    if (Object.keys(productData).length === 0) {
      res.status(404).json(responseJSON("Product updated failed", null, false));
    } else {
      try {
        var Update_Product_Result = await Product.findByIdAndUpdate(
          productId,
          productData,
          { new: true }
        );
        res.json(
          responseJSON("Product updated success", Update_Product_Result, true)
        );
      } catch (error) {
        res.json(responseJSON("Product updated failed", error, false));
      }
    }
  }

  async delete(req, res) {
    // Xử lí xóa hình ảnh trong drive
    const deleteFileDrive = async (ids) => {
      const deleteFile = async (authClient) => {
        // Tạo client Drive API
        const drive = google.drive({ version: "v3", auth: authClient });
        try {
          const responses = await Promise.all(
            ids.map((fileId, index) => {
              return drive.files.delete({ fileId });
            })
          );

          return {
            status: true,
            message: "Delete successfully",
            data: responses,
          };
        } catch (error) {
          console.log(error);
          return {
            status: false,
            data: [],
          };
        }
      };
      var auth = await GoogleCloud.authorize();
      if (auth) {
        var deleteResult = await deleteFile(auth);
        if (deleteResult.status === true) {
          return {
            success: true,
            message: "File deleted",
          };
        }
      } else {
        return {
          success: false,
          message: "Can't Authorization GoogleCloud",
        };
      }
    };

    try {
      var productIds = req.body;
      // Lấy danh sách các sản phẩm dựa trên các ID đã cho
      const products = await Product.find({ _id: { $in: productIds } });
      // Lặp qua danh sách sản phẩm và xóa hình ảnh liên quan
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const imageIds = product.Images;
        const productSpecsId = product.Product_specs;
        const driveIds = (await Image.find({ _id: { $in: imageIds } })).map(
          (image) => image.DriverId
        );
        // Xóa hình ảnh và các thông tin liên quan của sản phẩm
        await Image.deleteMany({ _id: { $in: imageIds } });
        await Product_specs.deleteMany({ _id: productSpecsId });
        await ProductFeature.deleteMany({ Product: product._id });
        // Xóa hình ảnh trong drive
        deleteFileDrive(driveIds);
      }
      // Xóa các sản phẩm trong bộ sưu tập "product"
      await Product.deleteMany({ _id: { $in: productIds } });
      res
        .status(200)
        .json(responseJSON("Product deleted successfully", null, true));
    } catch (error) {
      res.status(200).json(responseJSON("Product deleted failed", null, false));
    }
  }

  async getAmount(req, res) {
    var { type, id } = req.query;

    if (type === "brand") {
      var brand = await Brand.find({ _id: id });
      if (brand) {
        var amount = await Product.find({ Brand: brand }).countDocuments();
        res.json(
          responseJSON(
            "Get amount product with brand id successfully !",
            amount,
            true
          )
        );
      } else {
        res.json(
          responseJSON("Can't found brand to get amount product !", 0, false)
        );
      }
    } else if (type === "category") {
      var category = await Category.find({ _id: id });
      if (category) {
        var amount = await Product.find({
          Category: category,
        }).countDocuments();
        res.json(
          responseJSON(
            "Get amount product with category id successfully !",
            amount,
            true
          )
        );
      } else {
        res.json(
          responseJSON("Can't found category to get amount product !", 0, false)
        );
      }
    } else {
      res.json(responseJSON("Get data failed !"));
    }
  }

  async search(req, res) {
    var keyword = req.query.keyword;
    var hidden = req.query.hidden;
    if (hidden) {
      try {
        var Search_Product_Result = await Product.find({
          Name: { $regex: keyword, $options: "i" },
        })
          .skip(0)
          .limit(3)
          .populate("Images")
          .populate("Brand")
          .populate("Category")
          .populate("SubCategory");
        if (Search_Product_Result) {
          var Search_Count_Product_Result = await Product.find({
            Name: { $regex: keyword, $options: "i" },
          }).countDocuments();
          res.json({
            ...responseJSON(
              "Product find result: ",
              Search_Product_Result,
              true
            ),
            ["count"]: Search_Count_Product_Result,
          });
        } else {
          res.json(responseJSON("Product find result: ", [], true));
        }
      } catch (error) {
        console.log(error);
        res.json(responseJSON("Product find had error: ", null, false));
      }
    } else {
      try {
        var Search_Product_Result = await Product.find({
          Name: { $regex: keyword, $options: "i" },
        });
        if (Search_Product_Result)
          res.json(
            responseJSON("Product find result: ", Search_Product_Result, true)
          );
        else {
          res.json(responseJSON("Product find result: ", [], true));
        }
      } catch (error) {
        console.log(error);
        res.json(responseJSON("Product find had error: ", null, false));
      }
    }
  }

  async sortBy(req, res) {}
}

module.exports = new ProductController();
