const ProductController = require("../controllers/product.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const errorMiddleware = require("../middlewares/error.middleware");
const ProductRouter = require("express").Router();

ProductRouter.use(authMiddleware);
ProductRouter.route("/").get(errorMiddleware(ProductController.getProducts));

module.exports = ProductRouter;
