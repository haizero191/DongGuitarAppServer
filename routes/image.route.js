const express = require("express")
const router = express.Router();
const ImageController = require("../controllers/image.controller.js")
const uploadMiddleWare = require("../middlewares/multer");
const authMiddleWare = require("../middlewares/auth.middleware.js")



router.post('/create', authMiddleWare, ImageController.create);

router.post('/upload', authMiddleWare, uploadMiddleWare.array("files"), ImageController.upload);

router.use('/update/:id', authMiddleWare, ImageController.update);

router.delete('/drive/delete', authMiddleWare, ImageController.driveDel);

router.use('/detail/:id', ImageController.detail);

// router.use('/', ImageController.index);




module.exports = router;