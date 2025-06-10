import { createApi } from "@reduxjs/toolkit/query/react";

import {
  WordWithProgress,
  UpdateUserProgressProps,
  Word,
  UserProgressWithWord,
} from "../interfaces/WordInterface";
import { createBaseQuery } from "./api";

export const userProgressApi = createApi({
  reducerPath: "userProgressApi",
  baseQuery: createBaseQuery(
    "https://englishapp-uit.onrender.com/api/user-progress"
  ),
  endpoints: (builder) => ({
    getUnlearnedWordsByCourse: builder.query<Word[], string>({
      query: (course_id) => `getUnlearnedWordsByCourse/${course_id}`,
    }),
    getAllTodayRepeatWords: builder.query<UserProgressWithWord[], string>({
      query: (course_id) => `getAllTodayRepeatWordsByCourse/${course_id}`,
    }),
    getNumberTodayRepeatWords: builder.query<number, string>({
      query: (course_id) => `getNumberTodayRepeatWordsByCourse/${course_id}`,
    }),
    getAllCompletedWordsByCourse: builder.query<UserProgressWithWord[], string>(
      {
        query: (course_id) => `getCompletedWordsByCourse/${course_id}`,
      }
    ),
    getAllWordsWithProgress: builder.query<WordWithProgress[], string>({
      query: (course_id) => `getAllByCourse/${course_id}`,
    }),
    createUserProgress: builder.mutation<void, string>({
      query: (word_id) => ({
        url: `create/${word_id}`,
        method: "POST",
      }),
    }),
    updateUserProgress: builder.mutation<
      void,
      { word_id: string; body: UpdateUserProgressProps }
    >({
      query: ({ word_id, body }) => ({
        url: `update/${word_id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetUnlearnedWordsByCourseQuery,
  useGetAllTodayRepeatWordsQuery,
  useGetNumberTodayRepeatWordsQuery,
  useGetAllCompletedWordsByCourseQuery,
  useGetAllWordsWithProgressQuery,
  useCreateUserProgressMutation,
  useUpdateUserProgressMutation,
} = userProgressApi;
