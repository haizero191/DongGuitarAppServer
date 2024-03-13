const express = require("express")
const router = express.Router();
const FeatureController = require("../controllers/feature.controller.js")
const authMiddleWare = require("../middlewares/auth.middleware.js")


router.post('/create', authMiddleWare, FeatureController.create);

router.put('/update/:id', authMiddleWare, FeatureController.update);

router.delete('/delete', authMiddleWare, FeatureController.delete);

// router.use('/detail/:id', ProductController.detail);

router.use('/', FeatureController.index);




module.exports = router;