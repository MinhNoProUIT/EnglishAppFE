import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";
import { CreateSharedPostProps, SharedPost, SharedPostResponse } from "../interfaces/SharedPostInterface";

export const sharedPostApi = createApi({
  reducerPath: "sharedPostApi",
  baseQuery: createBaseQuery("https://englishapp-uit.onrender.com"),
  endpoints: (builder) => ({
    createSharedPost: builder.mutation<SharedPostResponse, CreateSharedPostProps>({
      query: (formData) => ({
        url: "api/shared-post/create",
        method: "POST",
        body: formData,
      }),
    }),
    getAllSharedPostsByUser: builder.query<SharedPost[], string>({  // <SharedPost[], string> vì userId là string
      query: (userId) => ({
        url: `api/shared-post/getByUser/${userId}`,
        method: "GET",
      }),
    }),
    getAllSharedPosts: builder.query<SharedPost[], void>({
      query: () => ({
        url: `api/shared-post/getAll`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateSharedPostMutation,
  useGetAllSharedPostsByUserQuery,
  useGetAllSharedPostsQuery,   // thêm export hook này
} = sharedPostApi;
