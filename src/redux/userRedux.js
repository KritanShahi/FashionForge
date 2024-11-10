import { createSlice } from "@reduxjs/toolkit";

// Create slice to manage user login state
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,  // User object with properties like `role` (isAdmin, etc.)
    isFetching: false,   // Used to track login progress
    error: false,       // Used to track errors
  },
  reducers: {
    // Action triggered when login starts
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
      console.log("Login started...");
    },

    // Action triggered when login is successful
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;  // Set the user data from the payload
      console.log("Login success:", action.payload);  // Log user info (including role, token, etc.)
    },

    // Action triggered when login fails
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      console.log("Login failed");
    },

    // Action triggered when user logs out
    logout: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
      console.log("User logged out");
    },
  },
});

// Export actions to be dispatched from components
export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

// Export reducer to be used in store configuration
export default userSlice.reducer;
