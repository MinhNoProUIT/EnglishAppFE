import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";
import { Group } from "../interfaces/GroupInterface";

export const groupApi = createApi({
  reducerPath: "groupApi",
  baseQuery: createBaseQuery("https://englishapp-uit.onrender.com"),
  endpoints: (builder) => ({
    createGroup: builder.mutation<Group, FormData>({
      query: (formData) => ({
        url: "api/groups/create",
        method: "POST",
        body: formData,
      }),
    }),
    changeGroupName: builder.mutation<Group, { groupId: string; name: string }>(
      {
        query: ({ groupId, name }) => ({
          url: `api/groups/change-name/${groupId}`,
          method: "PATCH",
          body: { name },
        }),
      }
    ),
    changeGroupImage: builder.mutation<
      Group,
      { groupId: string; formData: FormData }
    >({
      query: ({ groupId, formData }) => ({
        url: `api/groups/change-image/${groupId}`,
        method: "PATCH",
        body: formData,
      }),
    }),
    getDetailsGroup: builder.query<Group, string>({
      query: (groupId) => ({
        url: `api/groups/details/${groupId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateGroupMutation,
  useChangeGroupNameMutation,
  useChangeGroupImageMutation,
  useGetDetailsGroupQuery,
} = groupApi;
