import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  loading: localStorage.getItem("token") || null,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.role = action.payload.role;

      // save info in local storage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
});

export const { authStart, authSuccess, authFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
