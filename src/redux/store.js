



import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux"; // Adjust import paths as needed
import cartReducer from "./cartRedux";

// Helper function to load state from localStorage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error("Could not load state from localStorage", error);
    return undefined;
  }
};

// Hydrate the cart state
const preloadedState = {
  cart: loadStateFromLocalStorage(),
};

const rootReducer = combineReducers({
  user: userReducer, // Handles user-related state
  cart: cartReducer, // Handles cart-related state
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState, // Set preloaded state for cart persistence
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable if you have non-serializable values
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in non-production environments
});

// Listen for state changes and persist the cart to localStorage
store.subscribe(() => {
  try {
    const state = store.getState();
    const cartState = state.cart;
    localStorage.setItem("cart", JSON.stringify(cartState));
  } catch (error) {
    console.error("Could not save state to localStorage", error);
  }
});

export default store;


/*import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
*/


