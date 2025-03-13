import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import authApi from "./api/authApi";
import jobApi from "./api/jobsApi";
import profileApi from "./api/profileApi";
import { employerApi } from "./api/employerApi";
import adminApi from "./api/adminApi";
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    [authApi.reducerPath]: authApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [employerApi.reducerPath]: employerApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware, jobApi.middleware)
      .concat(profileApi.middleware)
      .concat(employerApi.middleware)
      .concat(adminApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
