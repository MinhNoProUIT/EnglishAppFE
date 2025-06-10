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

    checkOrderStatus: builder.query<paymentResponse, number>({
      query: (orderCode) => ({
        url: `status/${orderCode}`,
        method: "GET",
      }),
    }),

    createPayment: builder.mutation<
      void,
      { amount: number; orderCode: string; description: string }
    >({
      query: (paymentData) => ({
        url: "create",
        method: "POST",
        body: paymentData, // Truyền các tham số vào body của yêu cầu
      }),
    }),
  }),
});

export const {
  useGetAllPaymentQuery,
  useCheckOrderStatusQuery,
  useCreatePaymentMutation,
} = paymentApi;
