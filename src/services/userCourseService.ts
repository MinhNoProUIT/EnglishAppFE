import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";

interface userCourseResponse {
  Success: boolean;
  Data: any;
}

export const userCourseApi = createApi({
  reducerPath: "userCourseApi",
  baseQuery: createBaseQuery(
    "https://englishapp-uit.onrender.com/api/user-course"
  ),
  endpoints: (builder) => ({
    getUserCourses: builder.query<userCourseResponse, void>({
      query: () => "getUserCourses",
    }),

    createUserCourse: builder.mutation<
      userCourseResponse,
      { course_id: string }
    >({
      query: (data) => ({
        url: "create", // URL của API để tạo khóa học mới
        method: "POST", // Sử dụng phương thức POST
        body: data, // Truyền dữ liệu user_id và course_id vào body
      }),
    }),
  }),
});

export const { useGetUserCoursesQuery, useCreateUserCourseMutation } =
  userCourseApi;
