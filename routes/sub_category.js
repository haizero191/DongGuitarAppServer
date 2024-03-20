const express = require("express")
const router = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware.js")
const CategoryController = require("../controllers/category.controller.js")
const SubCategoryController = require("../controllers/sub_category.controller.js")



router.post('/create', authMiddleWare, SubCategoryController.create);

router.put('/update/:id', authMiddleWare, SubCategoryController.update);

router.delete('/delete', authMiddleWare, SubCategoryController.delete);

// router.put('/detail/:id', SubCategoryController.detail);

router.use('/', SubCategoryController.index);


module.exports = router;