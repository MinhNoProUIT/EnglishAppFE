import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";
import { CreateReactComment, ReactComment } from "../interfaces/ReactCommentInterface";

export const reactCommentApi = createApi({
  reducerPath: "reactCommentApi",
  baseQuery: createBaseQuery("https://englishapp-uit.onrender.com"),
  endpoints: (builder) => ({
    createReactComment: builder.mutation<ReactComment, CreateReactComment>({
      query: (data) => ({
        url: "api/react-comments/create",
        method: "POST",
        body: data,
      }),
    }),
    deleteReactComment: builder.mutation<any, { user_id: string; comment_id: string }>({
      query: ({ user_id, comment_id }) => ({
        url: `api/react-comments/delete/${user_id}/${comment_id}`,
        method: "DELETE",
      }),
    }),
    checkLikeComment: builder.query<
      { isLike: boolean },
      { user_id: string; comment_id: string }
    >({
      query: ({ user_id, comment_id }) => ({
        url: `api/react-comments/check-like/${user_id}/${comment_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateReactCommentMutation,
  useDeleteReactCommentMutation,
  useLazyCheckLikeCommentQuery,
} = reactCommentApi;
