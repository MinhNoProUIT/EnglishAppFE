import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";
import {
  Comment,
  CreateCommentPayload,
  DeleteCommentPayload,
  EditCommentPayload,
  GetComment,
  GetCommentsByPostPayload,
} from "../interfaces/CommentInterface";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: createBaseQuery("https://englishapp-uit.onrender.com"),
  endpoints: (builder) => ({
    createComment: builder.mutation<Comment, CreateCommentPayload>({
      query: (data) => ({
        url: "api/comments/create",
        method: "POST",
        body: data,
      }),
    }),
    editComment: builder.mutation<Comment, EditCommentPayload>({
      query: ({ id, ...data }) => ({
        url: `api/comments/edit/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteComment: builder.mutation<string, DeleteCommentPayload>({
      query: ({ id }) => ({
        url: `api/comments/delete/${id}`,
        method: "DELETE",
      }),
    }),
    getAllCommentsByPost: builder.query<GetComment[], GetCommentsByPostPayload>(
      {
        query: ({ type, id }) => ({
          url: `api/comments/getAllByPost/${type}/${id}`,
          method: "GET",
        }),
      }
    ),
  }),
});

export const {
  useCreateCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
  useGetAllCommentsByPostQuery,
} = commentApi;
