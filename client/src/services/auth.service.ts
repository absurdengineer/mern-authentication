import { RegisterService } from "../types/service.types";
import httpService from "./http.service";

export const register: RegisterService = async (payload) => {
  return httpService.post(`/auth/register`, payload);
};
