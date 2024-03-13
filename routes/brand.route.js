const express = require("express")
const router = express.Router();
const BrandController = require("../controllers/brand.controller.js")
const authMiddleWare = require("../middlewares/auth.middleware.js")


router.post('/create', authMiddleWare, BrandController.create);

router.put('/update/:id', authMiddleWare, BrandController.update);

router.delete('/delete', authMiddleWare, BrandController.delete);

// router.use('/detail/:id', ProductController.detail);

router.use('/', BrandController.index);




module.exports = router;