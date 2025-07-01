import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config";

export const employerApi = createApi({
  reducerPath: "employerApi",
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
    postJob: builder.mutation({
      query: (jobData) => ({
        url: "/employer/post-job",
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: ["Jobs"], // refetch jobs after posting a new job
    }),
    getEmployerJobs: builder.query({
      query: () => "/employer/my-jobs",
      invalidatesTags: ["Jobs"], // refetch jobs when this endpoint is called
    }),
    updateJob: builder.mutation({
      query: ({ jobId, updateData }) => ({
        url: `/employer/update-job/${jobId}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["Jobs"],
    }),
    deleteJob: builder.mutation({
      query: (jobId) => ({
        url: `/employer/delete-job/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"], // refetch jobs after deletion
    }),
    getViewApplications: builder.query({
      query: () => "/employer/applications",
      method: "GET",
      providesTags: ["Applications"], // cache applications
    }),
    updateViewApplicationStatus: builder.mutation({
      query: ({ appId, status }) => ({
        url: `/employer/applications/${appId}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Applications"],
    }),
  }),
});

export const {
  usePostJobMutation,
  useUpdateJobMutation,
  useGetEmployerJobsQuery,
  useDeleteJobMutation,
  useGetViewApplicationsQuery,
  useUpdateViewApplicationStatusMutation,
} = employerApi;
export default employerApi;
