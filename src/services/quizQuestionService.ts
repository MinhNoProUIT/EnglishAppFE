import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";

import { QuizQuestion } from "../interfaces/QuizInterface";

interface CreateQuestionRequest {
  quiz_id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export const quizQuestionApi = createApi({
  reducerPath: "quizQuestionApi",
  baseQuery: createBaseQuery(
    "https://englishapp-uit.onrender.com/api/quiz-questions"
  ),
  endpoints: (builder) => ({
    getAllQuizQuestions: builder.query<QuizQuestion[], string>({
      query: (quiz_id) => ({
        url: `getAllByQuiz/${quiz_id}`,
        method: "GET",
      }),
    }),
    createQuizQuestion: builder.mutation<QuizQuestion, CreateQuestionRequest>({
      query: (body) => ({
        url: "create",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetAllQuizQuestionsQuery, useCreateQuizQuestionMutation } = quizQuestionApi;
