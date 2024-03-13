const express = require("express")
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware.js")
const ProductSpecsController = require("../controllers/product_specs.controller.js")

router.post('/create', authMiddleWare, ProductSpecsController.create);

router.put('/update/:id', authMiddleWare, ProductSpecsController.update);

// router.delete('/delete', ProductSpecsController.delete);

// router.get('/detail/:id', ProductSpecsController.detail);

// router.get('/', ProductSpecsController.index);




module.exports = router;