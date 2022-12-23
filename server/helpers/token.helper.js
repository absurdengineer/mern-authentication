const jwt = require("jsonwebtoken");
const {
  accessTokenExpiry,
  refreshTokenExpiry,
} = require("../constants/authentication.constant");

const getAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: accessTokenExpiry,
  });
};

const getRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: refreshTokenExpiry,
  });
};

module.exports = {
  getAccessToken,
  getRefreshToken,
};
