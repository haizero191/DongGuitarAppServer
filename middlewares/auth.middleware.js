const jwt = require("jsonwebtoken");
const responseJSON = require("../config/responseJSON");

const isTokenExpired = (token, secretKey) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return {
      expired: false,
      decoded: decoded,
    };
  } catch (error) {
    return {
      expired: true,
      decoded: null,
    }; // Consider any error as expired for safety
  }
};

const authMiddleWare = (req, res, next) => {
  var accessToken = req.headers["authorization"];
  var refreshToken = req.headers["x-refresh-token"];

  if (!accessToken) {
    res.json(responseJSON("Authentication failure !", null, false));
  } else {
    accessToken = accessToken.split(" ")[1];
    // check access token expired
    const Check_AccessToken_Result = isTokenExpired(
      accessToken,
      "DONGGUITAR_SECRET_KEY"
    );

    if (Check_AccessToken_Result.expired) {
      // Check refresh token expired
      const Check_RefreshToken_Result = isTokenExpired(
        refreshToken,
        "DONGGUITAR_SECRET_KEY"
      );

      if (!Check_RefreshToken_Result.expired) {
        // Create new access token
        const newAccessToken = jwt.sign(
          { userId: Check_RefreshToken_Result.decoded.userId },
          "DONGGUITAR_SECRET_KEY",
          {
            expiresIn: "20s",
          }
        );
        // set token to response package
        res.setHeader("Authorization", `Bearer ${newAccessToken}`);
        next();
      } else {
        res.json(responseJSON("Authentication failure !", null, false));
      }
    } else {
      next();
    }
  }
};

module.exports = authMiddleWare;
