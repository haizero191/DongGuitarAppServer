const express = require("express")
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware.js")
const CategoryController = require("../controllers/category.controller.js")

router.post('/create', authMiddleWare, CategoryController.create);

router.put('/update/:id', authMiddleWare, CategoryController.update);

router.delete('/delete', authMiddleWare, CategoryController.delete);

// router.use('/detail/:id', ProductController.detail);

router.use('/', CategoryController.index);




module.exports = router;