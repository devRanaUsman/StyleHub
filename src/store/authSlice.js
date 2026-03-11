import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  role: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.role = action.payload ? action.payload.role : null;
      state.loading = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.role = null;
      state.loading = false;
    },
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setAuthUser, logoutUser, setAuthLoading } = authSlice.actions;
export default authSlice;
