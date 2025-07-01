import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config";

const applicationApi = createApi({
  reducerPath: "applicationApi",
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
    applyToJob: builder.mutation({
      query: (formData) => ({
        url: `/applications/apply`,
        method: "POST",
        body: formData,
      }),
    }),
    getUserApplications: builder.query({
      query: (userId) => `/applications/user/${userId}`,
    }),
    checkIfApplied: builder.query({
      query: ({ userId, jobId }) => `/applications/${userId}/${jobId}`,
    }),
  }),
});
export default applicationApi;
export const {
  useApplyToJobMutation,
  useGetUserApplicationsQuery,
  useCheckIfAppliedQuery,
} = applicationApi;
