const productRouter = require("./product.route.js");
const categoryRouter = require("./category.route.js");
const brandRouter = require("./brand.route.js");
const authRouter = require("./auth.route.js");
const imageRouter = require("./image.route.js");
const productSpecsRouter = require("./product_specs.route.js");
const senderRouter = require("./sender.route.js");
const orderRouter = require("./order.route.js");
const featureRouter = require("./feature.route.js");
const productFeatureRouter = require("./product_feature.route.js");
const subCategoryRouter = require("./sub_category.js");


function route(app) {
  // Product routers
  app.use("/api/products", productRouter);

  // Category routers
  app.use("/api/categories", categoryRouter);

  // Sub-category routes
  app.use("/api/sub-categories", subCategoryRouter);

  // Brand routes
  app.use("/api/brands", brandRouter);

  // Authentication routes
  app.use("/api/auth", authRouter);

  // Images routes
  app.use("/api/images", imageRouter);

  //Product_specs routers
  app.use("/api/product_specs", productSpecsRouter);

  // Email sender routes
  app.use("/api/sender", senderRouter);

  // Order routes
  app.use("/api/orders", orderRouter);

  // Featured routes
  app.use("/api/features", featureRouter);

  // Featured Product routes
  app.use("/api/product-feature", productFeatureRouter);


}

module.exports = route;
