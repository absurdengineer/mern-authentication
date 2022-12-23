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

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

module.exports = {
  getAccessToken,
  getRefreshToken,
  verifyRefreshToken,
};
