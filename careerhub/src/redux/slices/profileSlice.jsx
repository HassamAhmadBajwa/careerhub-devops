import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: JSON.parse(localStorage.getItem("profile") || null),
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    profileSuccess: (state, action) => {
      state.loading = false;
      state.profile = action.payload;

      // Save profile to localStorage
      localStorage.setItem("profile", JSON.stringify(action.payload));
    },
    profileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.profile = { ...state.profile, ...action.payload };

      // Update localStorage
      localStorage.setItem("profile", JSON.stringify(state.profile));
    },
    clearProfile: (state) => {
      state.profile = null;
      localStorage.removeItem("profile");
    },
  },
});

export const {
  profileStart,
  profileSuccess,
  profileFailure,
  updateProfileSuccess,
  clearProfile,
} = profileSlice.actions;
export default profileSlice.reducer;
