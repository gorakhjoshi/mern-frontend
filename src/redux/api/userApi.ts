import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/types";
import {
  AllUserResponse,
  DeleteUser,
  MessageResponse,
  UserResponse,
} from "../../types/ApiTypes";
import axios from "axios";

export const userAPI = createApi({
  reducerPath: "userApi", //Reducer name used in store.ts
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/user`,
  }), // Base url
  tagTypes: ["users"],
  endpoints: (builder) => ({
    //mutation is for data manipulation
    login: builder.mutation<MessageResponse, User>({
      //MessageResponse is for response type and User is for getting data for body
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }), // Can add more endpoints also
    getAllUser: builder.query<AllUserResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["users"],
    }),
    changeUserRole: builder.mutation<MessageResponse, DeleteUser>({
      query: ({ userId, adminId }) => ({
        url: `${userId}?id=${adminId}`,
        method: "PUT",
        body: { userId },
      }),
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation<MessageResponse, DeleteUser>({
      query: ({ userId, adminId }) => ({
        url: `${userId}?id=${adminId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useChangeUserRoleMutation,
} = userAPI; // useLoginMutation automatically generated according to endpoint name

export const getUser = async (id: string) => {
  try {
    const { data }: { data: UserResponse } = await axios.get(
      `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/user/${id}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};
