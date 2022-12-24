import { AxiosResponse } from "axios";
import { RegisterFormData } from "./state.types";

export interface RegisterService {
  (payload: RegisterFormData): Promise<AxiosResponse<any, any>>;
}
