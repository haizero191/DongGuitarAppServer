const express = require("express")
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware.js");
const ProductFeatureController = require("../controllers/product_feature.controller.js")


router.post('/create', ProductFeatureController.create);

// router.put('/update/:id', authMiddleWare, BrandController.update);

// Delete product feature 
router.delete('/delete', authMiddleWare, ProductFeatureController.delete);

// router.use('/detail/:id', ProductController.detail);

router.get('/getProductWithFeatureId/:id', ProductFeatureController.getProductWithFeatureId);

router.get('/', ProductFeatureController.index);




module.exports = router;