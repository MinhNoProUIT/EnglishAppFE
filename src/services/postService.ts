import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";
import { PostCreate } from "../interfaces/PostInterface";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: createBaseQuery("https://englishapp-uit.onrender.com"),
  endpoints: (builder) => ({
    createPost: builder.mutation<PostCreate, FormData>({
      query: (formData) => ({
        url: "api/posts/create",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
} = postApi;
