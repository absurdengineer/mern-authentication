const Joi = require("joi");
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
  return res.status(200).json({ message: "Login Successful" });
};

const refresh = async (req, res) => {
  return res.status(200).json({ message: "Refresh Successful" });
};

const logout = async (req, res) => {
  return res.status(200).json({ message: "Logout Successful" });
};

const AuthController = {
  register,
  login,
  refresh,
  logout,
};

module.exports = AuthController;
