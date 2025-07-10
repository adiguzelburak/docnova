import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Content, InvoiceRequest, InvoiceResponse } from "./types";
import { getInvoicesAPI } from "./invoiceAPI";
import type { RootState } from "../../store";
import Cookies from "js-cookie";

const initialState = {
  invoices: {} as InvoiceResponse,
  invoceDetail: {} as Content,
  loading: false,
  error: null as string | null,
};

interface InvoiceProps {
  data: InvoiceRequest;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const getInvoices = createAsyncThunk(
  "invoice/getInvoices",
  async ({ data, onSuccess, onError }: InvoiceProps, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const response = await getInvoicesAPI(
        data,
        state.auth.user?.jwt || (Cookies.get("token") as string)
      );
      onSuccess?.();

      localStorage.setItem(
        "invoices",
        JSON.stringify(response.invoices.content)
      );

      return response;
    } catch (error: any) {
      onError?.(error.response.data);
      throw error.response.data;
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    getInvoiceById: (state, action) => {
      const invoices = JSON.parse(localStorage.getItem("invoices") || "[]");
      const invoiceDetail = invoices.find(
        (invoice: Content) => invoice.id === action.payload
      );

      state.invoceDetail = invoiceDetail as Content;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInvoices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getInvoices.fulfilled, (state, action) => {
      state.loading = false;
      state.invoices = action.payload as InvoiceResponse;
    });
    builder.addCase(getInvoices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

export default invoiceSlice.reducer;
export const { getInvoiceById } = invoiceSlice.actions;
