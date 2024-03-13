const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const responseJSON = require("../config/responseJSON");
class AuthController {
  async login(req, res) {
    const { username, password } = req.body;

    try {
      // Tìm người dùng trong database
      const user = await User.findOne({ Username: username });
      if (user && user.Password === password) {
        // Tạo JWT
        const accessToken = jwt.sign({ userId: user._id }, "DONGGUITAR_SECRET_KEY", {
          expiresIn: "20s",
        });

        const refreshToken = jwt.sign({ userId: user._id }, "DONGGUITAR_SECRET_KEY", {
          expiresIn: "1d",
        });


        // Tạo user response data
        const userWithoutPassword = { ...user.toObject(), Password: undefined };
       
        res.json({ success: true, data: userWithoutPassword, accessToken, refreshToken });
      } else {
        res
          .status(200)
          .json({ success: false, message: "Invalid username or password" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: `Server error ${error}` });
    }
  }

  async checkAuth(req, res) {
    res.json(responseJSON("Successful authentication :> Wellcome admin", null, true))
  }
}

module.exports = new AuthController();
