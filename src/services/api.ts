// src/api.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  const token = await AsyncStorage.getItem("authToken");
  console.log("Token from AsyncStorage:", token);
  return token;
};

export const createBaseQuery = (baseUrl: string) => {
  return fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: async (headers) => {
      const token = await getToken();
      console.log(token);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
};
