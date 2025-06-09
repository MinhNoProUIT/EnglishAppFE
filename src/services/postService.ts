import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";
import { Post, PostCreate } from "../interfaces/PostInterface";

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
    getAllPostsByUser: builder.query<Post[], string>({
      query: (user_id) => ({
        url: `api/posts/getByUser/${user_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreatePostMutation, useGetAllPostsByUserQuery } = postApi;
