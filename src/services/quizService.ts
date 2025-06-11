import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";

import {
  Quiz,
  CreateEditQuizWithQuestionsProps,
} from "../interfaces/QuizInterface";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: createBaseQuery("https://englishapp-uit.onrender.com/api/quizzes"),
  endpoints: (builder) => ({
    getAllQuiz: builder.query<Quiz[], void>({
      query: () => "getAllByUser",
    }),
    createQuizWithQuestions: builder.mutation<
      Quiz,
      CreateEditQuizWithQuestionsProps
    >({
      query: (body) => ({
        url: "createQuizWithQuestions",
        method: "POST",
        body,
      }),
    }),
    editQuizWithQuestions: builder.mutation<
      Quiz,
      { quiz_id: string; body: CreateEditQuizWithQuestionsProps }
    >({
      query: ({ quiz_id, body }) => ({
        url: `updateQuizWithQuestions/${quiz_id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteQuiz: builder.mutation<void, string>({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllQuizQuery,
  useCreateQuizWithQuestionsMutation,
  useEditQuizWithQuestionsMutation,
  useDeleteQuizMutation,
} = quizApi;
