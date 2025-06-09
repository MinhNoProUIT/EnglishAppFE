import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";
import { CreateReactPost, ReactPost } from "../interfaces/ReactPostInterface";

export const reactPostApi = createApi({
  reducerPath: "reactPostApi",
  baseQuery: createBaseQuery("https://englishapp-uit.onrender.com"),
  endpoints: (builder) => ({
    createReactPost: builder.mutation<ReactPost, CreateReactPost>({
      query: (data) => ({
        url: "api/react-posts/create",
        method: "POST",
        body: data,
      }),
    }),
    deleteReactPost: builder.mutation<any, string>({
      query: (id) => ({
        url: `api/react-posts/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateReactPostMutation, useDeleteReactPostMutation } =
  reactPostApi;
