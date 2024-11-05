import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux"; // Adjust import paths
import cartReducer from "./cartRedux";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;


