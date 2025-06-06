import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";
import { GroupItemQueryProps } from "../interfaces/GroupInterface";
import { AddMemberData, KickMemberResponse, MemberData } from "../interfaces/MemberInterface";

export const groupMemberApi = createApi({
  reducerPath: "groupMemberApi",
  baseQuery: createBaseQuery("https://englishapp-uit.onrender.com"),
  endpoints: (builder) => ({
    getAllGroupByUser: builder.query<GroupItemQueryProps[], string>({
      query: (user_id) => ({
        url: `api/group-members/user/${user_id}`,
        method: "GET",
      }),
    }),
    getAllMembers: builder.query<MemberData[], string>({
      query: (group_id) => ({
        url: `api/group-members/group/${group_id}`,
        method: "GET",
      }),
    }),
    addMemberToGroup: builder.mutation<
      AddMemberData,
      { group_id: string; user_id: string }
    >({
      query: ({ user_id }) => ({
        url: `api/group-members`,
        method: "POST",
        body: { user_id },
      }),
    }),
    kickMemberFromGroup: builder.mutation<
      KickMemberResponse,
      { group_id: string; user_id: string }
    >({
      query: ({ group_id, user_id }) => ({
        url: `api/group-members/kick/${group_id}/${user_id}`,
        method: "DELETE",
        body: { group_id, user_id },
      }),
    }),
  }),
});

export const {
  useGetAllGroupByUserQuery,
  useGetAllMembersQuery,
  useAddMemberToGroupMutation,
  useKickMemberFromGroupMutation,
} = groupMemberApi;
