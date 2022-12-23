const { verifyAccessToken } = require("../helpers/token.helper");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization") || req.header("authorization");
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const user = verifyAccessToken(token);
    if (!user) return res.status(403).json({ message: "Forbidden" });
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res.status(403).json({ message: "Forbidden" });
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = authMiddleware;
