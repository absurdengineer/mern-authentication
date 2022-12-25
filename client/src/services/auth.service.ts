import { RegisterService, LoginService } from "../types/service.types";
import httpService from "./http.service";

export const register: RegisterService = async (payload) => {
  return httpService.post(`/auth/register`, payload);
};

export const login: LoginService = async (payload) => {
  return httpService.post(`/auth/login`, payload, { withCredentials: true });
};
