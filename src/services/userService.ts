import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";
import {
  GetAllUsersResponse,
  User,
  UserDetail,
} from "../interfaces/UserInterface";

export interface update {
  username: string;
  phonenumber: string;
  email: string;
  birthday: Date;
  gender: boolean;
  fullname: string;
  address: string;
  image_url: string;
  created_date: Date;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: createBaseQuery("https://englishapp-uit.onrender.com"),
  tagTypes: ["User"],
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
    getById: builder.query<UserDetail, void>({
      query: () => ({
        url: `api/users/getById`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getDetailsUser: builder.query<UserDetail, void>({
      query: () => ({
        url: `api/users/getById`,
        method: "GET",
      }),
    }),
    update: builder.mutation<void, { formData: FormData; changeBy: string }>({
      query: ({ formData, changeBy }) => ({
        url: `api/users/update/${changeBy}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    remove: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `api/users/remove/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllUserRecommendsQuery,
  useGetByIdQuery,
  useUpdateMutation,
  useRemoveMutation,
  useGetDetailsUserQuery,
} = userApi;
