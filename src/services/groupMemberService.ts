import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";
import { GroupItemQueryProps } from "../interfaces/GroupInterface";
import { AddMemberData, MemberData } from "../interfaces/MemberInterface";

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
      AddMemberData[],
      { group_id: string; user_ids: string[]; is_admin?: boolean }
    >({
      query: ({ user_ids, group_id, is_admin = false }) => ({
        url: `api/group-members/add`,
        method: "POST",
        body: { user_ids, group_id, is_admin },
      }),
    }),
    kickMemberFromGroup: builder.mutation<string, { group_id: string; user_ids: string[] }>(
      {
        query: ({ user_ids, group_id }) => ({
          url: `api/group-members/kick`,
          method: "POST",
          body: { user_ids, group_id },
        }),
      }
    ),
    leaveGroup: builder.mutation<string, { group_id: string; user_id: string }>(
      {
        query: ({ group_id, user_id }) => ({
          url: `api/group-members/leave`,
          method: "POST",
          body: { group_id, user_id },
        }),
      }
    ),
    dishBandGroup: builder.mutation<string, { group_id: string }>({
      query: ({ group_id }) => ({
        url: `api/group-members/dishband/${group_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllGroupByUserQuery,
  useGetAllMembersQuery,
  useAddMemberToGroupMutation,
  useKickMemberFromGroupMutation,
  useLeaveGroupMutation,
  useDishBandGroupMutation,
} = groupMemberApi;
