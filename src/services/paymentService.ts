import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";

interface paymentResponse {
  Success: boolean;
  Data: any;
}

export interface ICreatePaymentResponse {
  Data: { orderCode: number; checkoutUrl: string; qrCode: string };
  Success: boolean;
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

    createPaymentOrder: builder.mutation<
      ICreatePaymentResponse,
      { amount: number; description: string }
    >({
      query: (data) => ({
        url: "create",
        method: "POST",
        body: data, // truyền vào {amount, description}
      }),
    }),

    checkOrderStatus: builder.query<paymentResponse, number>({
      query: (orderCode) => ({
        url: `status/${orderCode}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllPaymentQuery,
  useCreatePaymentOrderMutation,
  useCheckOrderStatusQuery,
} = paymentApi;
