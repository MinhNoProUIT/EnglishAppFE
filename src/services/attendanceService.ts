import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";

interface attendanceResponse {
  Success: boolean;
  Data: any;
}

export const attendanceApi = createApi({
  reducerPath: "attendanceApi",
  baseQuery: createBaseQuery(
    "https://englishapp-uit.onrender.com/api/attendance"
  ),
  endpoints: (builder) => ({
    getAllUser: builder.query<attendanceResponse, void>({
      query: () => "getAllUser",
    }),
  }),
});

export const { useGetAllUserQuery } = attendanceApi;
