import {
  RegisterService,
  LoginService,
  LogoutService,
} from "../types/service.types";
import httpService from "./http.service";

export const register: RegisterService = async (payload) =>
  httpService.post(`/auth/register`, payload);

export const login: LoginService = async (payload) =>
  httpService.post(`/auth/login`, payload, { withCredentials: true });

export const logout: LogoutService = async () =>
  httpService.post(`/auth/logout`, {}, { withCredentials: true });
