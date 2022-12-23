const AuthController = require("../controllers/auth.controller");
const AuthRouter = require("express").Router();

AuthRouter.route("/register").post(AuthController.register);
AuthRouter.route("/login").post(AuthController.login);
AuthRouter.route("/refresh").post(AuthController.refresh);
AuthRouter.route("/logout").post(AuthController.logout);

module.exports = AuthRouter;
