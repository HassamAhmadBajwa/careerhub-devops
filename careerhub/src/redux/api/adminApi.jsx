import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/admin/users",
    }),
    updateUserStatus: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `/admin/users/${id}`,
        method: "PUT",
        body: { isActive },
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
    }),
    getJobs: builder.query({
      query: () => "/admin/jobs",
    }),
    updateJobStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/jobs/${id}`,
        method: "PUT",
        body: { status },
      }),
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/admin/jobs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
  useGetJobsQuery,
  useUpdateJobStatusMutation,
  useDeleteJobMutation,
} = adminApi;

export default adminApi;
