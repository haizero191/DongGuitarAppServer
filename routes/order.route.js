const express = require("express")
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware.js");
const orderController = require("../controllers/order.controller.js");


router.post('/create', orderController.create);

// router.put('/update/:id', authMiddleWare, BrandController.update);

// router.delete('/delete', authMiddleWare, BrandController.delete);

// router.use('/detail/:id', ProductController.detail);

// router.use('/', BrandController.index);




module.exports = router;