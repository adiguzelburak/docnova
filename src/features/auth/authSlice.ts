import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { LoginRequest, LoginResponse } from "./types";
import { loginAPI } from "./authAPI";
import Cookies from "js-cookie";

const initialState = {
  user: null as LoginResponse | null,
  loading: false,
  error: null as string | null,
};

interface LoginProps {
  data: LoginRequest;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ data, onSuccess, onError }: LoginProps) => {
    try {
      const response = await loginAPI(data);

      onSuccess?.();

      return response;
    } catch (error: any) {
      onError?.(error.response.data);
      throw error.response.data;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      Cookies.remove("token");
    },
    initializeAuth: (state) => {
      const token = Cookies.get("token");
      if (token) {
        state.user = { jwt: token } as LoginResponse;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload as LoginResponse;
      Cookies.set("token", action.payload.jwt);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

export const { logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
