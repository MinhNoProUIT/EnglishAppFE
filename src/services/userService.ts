import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";

// Định nghĩa kiểu dữ liệu cho User
interface User {
  id: string;
  username: string;
  email: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: createBaseQuery("https://englishapp-uit.onrender.com"),
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => "/users",
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
