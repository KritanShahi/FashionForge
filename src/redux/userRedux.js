// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,  // User object with properties like `role`
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
      console.log("Login started"); 
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload; // Set user with role information
      console.log("Login success:", action.payload); 
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      console.log("Login failed"); 
    },
    logout: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
      console.log("User logged out"); 
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
