import { AxiosResponse } from "axios";
import { LoginFormData, RegisterFormData } from "./state.types";

export interface RegisterService {
  (payload: RegisterFormData): Promise<AxiosResponse<any, any>>;
}

export interface LoginService {
  (payload: LoginFormData): Promise<AxiosResponse<any, any>>;
}
