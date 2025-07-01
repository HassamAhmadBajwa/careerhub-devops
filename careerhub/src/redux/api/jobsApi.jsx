import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config";

export const jobApiSlice = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: () => "/jobs",
    }),
    getSingleJob: builder.query({
      query: (id) => `/job/${id}`,
    }),
    //  Get jobs posted by the logged-in employer
    getEmployerJobs: builder.query({
      query: () => "/employer/my-jobs",
      providesTags: ["Jobs"],
    }),
  }),
});
export const {
  useGetAllJobsQuery,
  useGetSingleJobQuery,
  useGetEmployerJobsQuery,
} = jobApiSlice;
export default jobApiSlice;
