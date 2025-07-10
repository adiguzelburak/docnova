import { axiosInstance } from "../../services/axiosInstance";
import { API_ENDPOINTS } from "../../constants";
import type { LoginRequest, LoginResponse } from "./types";

export const loginAPI = async (data: LoginRequest) => {
  const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, data);
  return response.data as LoginResponse;
};
