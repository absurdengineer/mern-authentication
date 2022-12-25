import { AxiosResponse } from "axios";

export type ApiResponse = Promise<AxiosResponse<any, any>>;
