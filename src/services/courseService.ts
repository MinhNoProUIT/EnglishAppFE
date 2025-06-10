import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";

import { Course, LockedCourse } from "../interfaces/CourseInterface";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: createBaseQuery(
    "https://englishapp-uit.onrender.com/api/courses"
  ),
  endpoints: (builder) => ({
    getAllOngoingCourses: builder.query<Course[], void>({
      query: () => "getAllOngoingCoursesByUser",
    }),
    getAllCompletedCourses: builder.query<Course[], void>({
      query: () => "getAllCompletedCoursesByUser",
    }),
    getAllLearnMoreCourses: builder.query<LockedCourse[], void>({
      query: () => "getAll",
    }),
  }),
});

export const {
  useGetAllOngoingCoursesQuery,
  useGetAllCompletedCoursesQuery,
  useGetAllLearnMoreCoursesQuery
} = courseApi;
