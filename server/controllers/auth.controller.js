const Joi = require("joi");
const _ = require("underscore");
const { cookieMaxAge } = require("../constants/authentication.constant");
const {
  getAccessToken,
  getRefreshToken,
  verifyRefreshToken,
} = require("../helpers/token.helper");
const User = require("../models/user.model");

const validateAuth = (auth) =>
  Joi.object({
    firstName: Joi.string().min(3).when("register", {
      is: 1,
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
    lastName: Joi.string().when("register", {
      is: 1,
      then: Joi.optional(),
      otherwise: Joi.forbidden(),
    }),
    email: Joi.string().email().when("register", {
      is: 1,
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
    username: Joi.string().min(8).required(),
    password: Joi.string().min(8).required(),
    register: Joi.number().optional(),
  }).validateAsync(auth);

const register = async (req, res) => {
  await validateAuth({ ...req.body, register: 1 });
  const emailCount = await User.count({ where: { email: req.body.email } });
  if (emailCount > 0)
    throw { statusCode: 400, message: "Email is already registered with us" };
  const usernameCount = await User.count({
    where: { username: req.body.username },
  });
  if (usernameCount > 0)
    throw { statusCode: 400, message: "Username is already taken" };
  const user = await User.create(req.body);
  return res
    .status(200)
    .json({ data: user, message: "Registration Successful" });
};

const login = async (req, res) => {
  await validateAuth({ ...req.body, register: 0 });
  const user = await User.findByCredentials(req.body);
  const accessToken = getAccessToken(
    _.omit(user.dataValues, "password", "createdAt", "updatedAt", "deletedAt")
  );
  const refreshToken = getRefreshToken(_.pick(user.dataValues, "username"));
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: cookieMaxAge,
  });
  return res
    .status(200)
    .json({ data: { accessToken }, message: "Login Successful" });
};

const refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) throw { statusCode: 401, message: "Unauthorized" };
  const refreshToken = cookies.jwt;
  let user = verifyRefreshToken(refreshToken);
  user = await User.findOne({ where: { username: user.username } });
  if (!user) throw { statusCode: 401, message: "Unauthorized" };
  const accessToken = getAccessToken(
    _.omit(user.dataValues, "password", "createdAt", "updatedAt", "deletedAt")
  );
  return res
    .status(200)
    .json({ data: { accessToken }, message: "Refresh Successful" });
};

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(204).json();
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  return res.status(200).json({ message: "Logout Successful" });
};

const AuthController = {
  register,
  login,
  refresh,
  logout,
};

module.exports = AuthController;
