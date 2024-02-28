import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  DashboardResponse,
  ProductsStatsResponse,
  SalesReportResponse,
  YearlyReportResponse,
} from "../../types/ApiTypes";

export const dashboardAPI = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/dashboard`,
  }),
  tagTypes: ["dashboard"],
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardResponse, string>({
      query: (id) => `stats?id=${id}`,
      keepUnusedDataFor:0
    }),
    getProductsStats: builder.query<ProductsStatsResponse, string>({
      query: (id) => `productStats?id=${id}`,
      keepUnusedDataFor:0
    }),
    getSalesReport: builder.query<SalesReportResponse, string>({
      query: (id) => `salesRepots?id=${id}`,
      keepUnusedDataFor:0
    }),
    getYearlyReport: builder.query<YearlyReportResponse, string>({
      query: (id) => `yearlyReports?id=${id}`,
      keepUnusedDataFor:0
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetProductsStatsQuery,
  useGetSalesReportQuery,
  useGetYearlyReportQuery,
} = dashboardAPI;
