import { API_ENDPOINTS } from "../../constants";
import { axiosInstance } from "../../services/axiosInstance";
import type { InvoiceRequest, InvoiceResponse } from "./types";

export const getInvoicesAPI = async (data: InvoiceRequest, token: string) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.GET_INVOICES_LIST,
    data,
    {
      headers: {
        "R-Auth": token,
      },
    }
  );
  return response.data as InvoiceResponse;
};
