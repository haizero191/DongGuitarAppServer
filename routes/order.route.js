const express = require("express")
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware.js");
const OrderController = require("../controllers/order.controller.js");





router.post('/create', OrderController.create);

router.put('/update/:id', authMiddleWare, OrderController.update);

router.use('/count', authMiddleWare, OrderController.count);

router.use('/search', OrderController.search);

router.use('/', authMiddleWare, OrderController.index);


// router.delete('/delete', authMiddleWare, BrandController.delete);

// router.use('/detail/:id', ProductController.detail);





module.exports = router;