import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";
import {
  MessageItemProps,
  SendMessageProps,
} from "../interfaces/MessageInterface";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: createBaseQuery("https://englishapp-uit.onrender.com"),
  endpoints: (builder) => ({
    getAllMessages: builder.query<MessageItemProps[], string>({
      query: (group_id) => ({
        url: `api/messages/getAll/${group_id}`,
        method: "GET",
      }),
    }),
    sendMessage: builder.mutation<void, SendMessageProps>({
      query: (data) => ({
        url: "api/messages/send",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllMessagesQuery, useSendMessageMutation } = messageApi;
