import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";
import { WordType } from "../types/WordType";

export interface IWordTypeResponse {
  // Khai báo kiểu dữ liệu cho `data`
  id: string;
  englishname: string;
  vietnamesename: string;
  transcription: string;
  type: string;
  examplesentence: string;
  imageurl: string;
  level?: number; // `level` có thể không có trong dữ liệu
}

export const wordApi = createApi({
  reducerPath: "wordApi",
  baseQuery: createBaseQuery("https://englishapp-uit.onrender.com"),
  endpoints: (builder) => ({
    getAllByCourse: builder.query<IWordTypeResponse[], string>({
      query: (course_id) => {
        console.log(course_id);
        return {
          url: `api/words/getAllByCourse/${course_id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllByCourseQuery } = wordApi;
