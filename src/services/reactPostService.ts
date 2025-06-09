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
    deleteReactPost: builder.mutation<any, { user_id: string; post_id: string }>({
      query: ({ user_id, post_id }) => ({
        url: `api/react-posts/delete/${user_id}/${post_id}`,
        method: "DELETE",
      }),
    }),
    checkLikePost: builder.query<
      { isLike: boolean },
      { user_id: string; post_id: string }
    >({
      query: ({ user_id, post_id }) => ({
        url: `api/react-posts/check-like/${user_id}/${post_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateReactPostMutation,
  useDeleteReactPostMutation,
  useLazyCheckLikePostQuery,
} = reactPostApi;
