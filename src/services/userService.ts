import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";
import { GetAllUsersResponse, User } from "../interfaces/UserInterface";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: createBaseQuery("https://englishapp-uit.onrender.com"),
  endpoints: (builder) => ({
    getAllUsers: builder.query<
      GetAllUsersResponse[],
      {
        search?: string;
        page?: number;
        rowsPerPage?: number;
        sortBy?: string;
        sortOrder?: string;
      }
    >({
      query: ({
        search = "",
        page = 1,
        rowsPerPage = 10,
        sortBy = "name",
        sortOrder = "ASC",
      }) => {
        const params = new URLSearchParams({
          search,
          page: page.toString(),
          rowsPerPage: rowsPerPage.toString(),
          sortBy,
          sortOrder,
        });
        return {
          url: `api/users/GetAll?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    getAllUserRecommends: builder.query<User[], void>({
      query: () => ({
        url: "api/users/get-recommend",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useGetAllUserRecommendsQuery } = userApi;
