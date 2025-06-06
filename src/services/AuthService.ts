import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";

export interface User {
  id: string;
  username: string;
  email: string;
  role: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
  role: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: createBaseQuery("https://englishapp-uit.onrender.com/auth"),
  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterRequest>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    me: builder.query<User, void>({
      query: () => ({
        url: "/me", // this endpoint should return the current user info, used to validate token
        method: "GET",
      }),
    }),
    changePassword: builder.mutation<void, ChangePasswordRequest>({
      query: (body) => ({
        url: "/change-password",
        method: "PUT",
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useMeQuery,
  useChangePasswordMutation,
  useLogoutMutation,
} = authApi;
