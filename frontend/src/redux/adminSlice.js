// src/redux/adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
    logoutAdmin: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
