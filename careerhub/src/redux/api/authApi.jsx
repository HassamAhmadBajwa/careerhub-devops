import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config";
const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
    loginAdmin: builder.mutation({
      query: (userData) => ({
        url: "/admin/login",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLoginAdminMutation } =
  authApi;
export default authApi;
