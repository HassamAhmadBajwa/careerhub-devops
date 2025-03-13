import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../../config";

export const profileApi = createApi({
  reducerPath: "profileApi",
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
    getProfile: builder.query({
      query: () => "/job-seeker/profile",
    }),
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/job-seeker/profile/update",
        method: "PATCH",
        body: formData,
        formData: true,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
export default profileApi;
