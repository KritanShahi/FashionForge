import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux"; // Adjust import paths as needed
import cartReducer from "./cartRedux";

const rootReducer = combineReducers({
  user: userReducer,  // Handles user-related state
  cart: cartReducer,  // Handles cart-related state
});

const store = configureStore({
  reducer: rootReducer,
  // Add optional middleware or devTools if needed
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable if you have non-serializable values
    }),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in non-production environments
});

export default store;



