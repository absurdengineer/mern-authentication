const AuthController = require("../controllers/auth.controller");
const errorMiddleware = require("../middlewares/error.middleware");
const AuthRouter = require("express").Router();

AuthRouter.route("/register").post(errorMiddleware(AuthController.register));
AuthRouter.route("/login").post(errorMiddleware(AuthController.login));
AuthRouter.route("/refresh").get(errorMiddleware(AuthController.refresh));
AuthRouter.route("/logout").post(errorMiddleware(AuthController.logout));

module.exports = AuthRouter;
