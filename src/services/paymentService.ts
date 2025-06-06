import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";

interface paymentResponse {
  Success: boolean;
  Data: any;
}

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: createBaseQuery(
    "https://englishapp-uit.onrender.com/api/payments"
  ),
  endpoints: (builder) => ({
    getAllPayment: builder.query<paymentResponse, void>({
      query: () => "getAll",
    }),
  }),
});

export const { useGetAllPaymentQuery } = paymentApi;
