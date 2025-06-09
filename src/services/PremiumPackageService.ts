import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./api";

interface premiumPackageResponse {
  Success: boolean;
  Data: any;
}

export interface IGetAllPremiumPackage {
  id: string;
  name: string;
  duration_days: number;
  price: number;
  original_price: number;
  discount: string;
}

export const premiumPackageApi = createApi({
  reducerPath: "premiumPackageApi",
  baseQuery: createBaseQuery(
    "https://englishapp-uit.onrender.com/api/premium-package"
  ),
  endpoints: (builder) => ({
    getAllPremiumPackage: builder.query<premiumPackageResponse, void>({
      query: () => "getAll",
    }),
  }),
});

export const { useGetAllPremiumPackageQuery } = premiumPackageApi;
