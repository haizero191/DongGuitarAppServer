const express = require("express")
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware.js")
const ProductController = require("../controllers/product.controller.js")

router.post('/create', authMiddleWare, ProductController.create);

router.put('/update/:id', authMiddleWare, ProductController.update);

router.get('/detail/:id', ProductController.detail);

router.delete('/delete', authMiddleWare, ProductController.delete);

router.get('/search', ProductController.search);

router.get('/', ProductController.index);

router.get("/getAmount", ProductController.getAmount)


module.exports = router;