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
    }),
    getEmployerJobs: builder.query({
      query: () => "/employer/my-jobs",
    }),
  }),
});

export const { usePostJobMutation, useGetEmployerJobsQuery } = employerApi;
export default employerApi;
