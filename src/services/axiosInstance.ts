import axios from "axios";
import { BASE_URL } from "../constants";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
