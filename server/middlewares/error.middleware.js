const errorMiddleware = (asyncFunc) => async (req, res, next) => {
  try {
    await asyncFunc(req, res, next);
  } catch (error) {
    if (error.name === "ValidationError")
      return res.status(400).json({ message: error.message });
    if (error.statusCode)
      return res.status(error.statusCode).json({ message: error.message });
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = errorMiddleware;
