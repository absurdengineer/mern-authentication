import Joi from "joi";
import { RegisterFormData } from "../types/state.types";

interface AuthSchema extends RegisterFormData {
  register: number;
}

export const validateAuth = (auth: AuthSchema) =>
  Joi.object({
    firstName: Joi.string().label("First Name").min(3).when("register", {
      is: 1,
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
    lastName: Joi.string()
      .label("Last Name")
      .when("register", {
        is: 1,
        then: Joi.optional().allow(""),
        otherwise: Joi.forbidden(),
      }),
    email: Joi.string()
      .label("Email")
      .email({ tlds: { allow: false } })
      .when("register", {
        is: 1,
        then: Joi.required(),
        otherwise: Joi.forbidden(),
      }),
    username: Joi.string().label("Username").min(8).required(),
    password: Joi.string().label("Password").min(8).required(),
    register: Joi.number().optional(),
  }).validateAsync(auth, { abortEarly: false });
