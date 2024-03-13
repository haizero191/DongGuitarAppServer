const express = require("express")
const router = express.Router();




const AuthController = require("../controllers/auth.contoller");
const authMiddleWare = require("../middlewares/auth.middleware");

router.post('/login', AuthController.login);

router.post('/check', authMiddleWare, AuthController.checkAuth);

// router.post('/register', AuthController.register);

// router.get('/role', AuthController.checkRole);

module.exports = router;