import { GetProductsService } from "../types/service.types";
import httpService from "./http.service";

export const getProducts: GetProductsService = async (accessToken) => {
  return httpService.get(`/products`, {
    headers: {
      Authorization: accessToken,
    },
  });
};
