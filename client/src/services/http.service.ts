import axios from "axios";
import { API_URL } from "../constants/api.constants";

const http = axios.create({
  baseURL: API_URL,
});

export default {
  get: http.get,
  post: http.post,
  put: http.put,
  patch: http.patch,
  delete: http.delete,
};
