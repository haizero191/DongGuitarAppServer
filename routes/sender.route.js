const express = require("express")
const router = express.Router();
const SenderController = require("../controllers/sender.controller.js")


// router.use('/detail/:id', ProductController.detail);

router.use('/', SenderController.index);




module.exports = router;