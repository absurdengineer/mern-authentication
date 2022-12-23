const { verifyAccessToken } = require("../helpers/token.helper");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization") || req.header("authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  const user = verifyAccessToken(token);
  if (!user) return res.status(403).json({ message: "Forbidden" });
  req.user = user;
  next();
};

module.exports = authMiddleware;
