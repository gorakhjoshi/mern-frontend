import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllOrdersResponse,
  MessageResponse,
  NewOrder,
  SingleOrderResponse,
  UpdateOrder
} from "../../types/ApiTypes";

export const orderAPI = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/orders`,
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<MessageResponse, NewOrder>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["orders"],
    }),
    updateOrder: builder.mutation<MessageResponse, UpdateOrder>({
      query: ({ orderId, userId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation<MessageResponse, UpdateOrder>({
      query: ({ orderId, userId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
    myOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => `myorders?id=${id}`,
      providesTags: ["orders"],
    }),
    allOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["orders"],
    }),
    getOrderDetails: builder.query<SingleOrderResponse, string>({
      query: (id) => id,
      providesTags: ["orders"],
    }),
  }),
});

export const {
  useNewOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useMyOrdersQuery,
  useAllOrdersQuery,
  useGetOrderDetailsQuery,
} = orderAPI;
