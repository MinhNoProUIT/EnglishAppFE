// src/api.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const createBaseQuery = (baseUrl: string) => {
  return fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  });
};
