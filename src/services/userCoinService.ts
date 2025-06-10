import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";

// Định nghĩa interface response
interface userCoinResponse {
  Success: boolean;
  Data: any;
}

// Định nghĩa API
export const userCoinApi = createApi({
  reducerPath: "userCoinApi",
  baseQuery: createBaseQuery(
    "https://englishapp-uit.onrender.com/api/user-coins"
  ),
  tagTypes: ["UserCoin"], // Định nghĩa loại tag

  endpoints: (builder) => ({
    // Endpoint để lấy số coin hiện tại của user
    getCurrentCoin: builder.query<userCoinResponse, void>({
      query: () => "user-coin", // GET request
      providesTags: (result) =>
        result ? [{ type: "UserCoin", id: "LIST" }] : [], // Đảm bảo gán tag cho dữ liệu
    }),

    // Endpoint để tạo UserCoin mới
    createUserCoin: builder.mutation<userCoinResponse, void>({
      query: () => ({
        url: "user-coin",
        method: "POST", // POST request
      }),
      invalidatesTags: [{ type: "UserCoin", id: "LIST" }], // Invalidates data khi tạo coin mới
    }),

    // Endpoint để cập nhật total_coin của user (cộng hoặc trừ coin)
    updateTotalCoin: builder.mutation<userCoinResponse, { coinChange: number }>(
      {
        query: (body) => ({
          url: "user-coin",
          method: "PUT", // PUT request
          body: body, // Truyền coinChange từ body
        }),
        invalidatesTags: [{ type: "UserCoin", id: "LIST" }], // Invalidates data khi cập nhật coin
      }
    ),
  }),
});

// Export hooks cho các endpoint
export const {
  useGetCurrentCoinQuery,
  useCreateUserCoinMutation,
  useUpdateTotalCoinMutation,
} = userCoinApi;
