import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";

interface attendanceResponse {
  Success: boolean;
  Data: any;
}

interface AttendanceResponse {
  Success: boolean;
  Data: Array<{
    day: string;
    date: string;
    attended: boolean;
  }>;
  Message: string;
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

    getWeeklyAttendanceStatus: builder.query<AttendanceResponse, void>({
      query: () => "weekly", // Thêm userId vào URL
    }),

    createAttendance: builder.mutation<AttendanceResponse, void>({
      query: () => ({
        url: "create",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetWeeklyAttendanceStatusQuery,
  useGetAllUserQuery,
  useCreateAttendanceMutation,
} = attendanceApi;
