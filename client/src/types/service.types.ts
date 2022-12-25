import { AxiosResponse } from "axios";
import { ApiResponse } from "./api.types";
import { LoginFormData, RegisterFormData } from "./state.types";

export interface RegisterService {
  (payload: RegisterFormData): ApiResponse;
}

export interface LoginService {
  (payload: LoginFormData): ApiResponse;
}

export interface LogoutService {
  (): ApiResponse;
}

export interface GetProductsService {
  (accessToken: string | null): ApiResponse;
}
