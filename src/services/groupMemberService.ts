import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";
import { GroupItemQueryProps } from "../interfaces/GroupInterface";

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
  }),
});

export const { useGetAllGroupByUserQuery } = groupMemberApi;
