import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import cartReducer from "./cartRedux";

// Helper function to load state from localStorage
const loadStateFromLocalStorage = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined; // Return undefined for no data
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error(`Could not load state for ${key} from localStorage`, error);
    return undefined;
  }
};

// Define initial states (should match your slice initial states)
const getInitialCartState = () => ({
  products: [],
  quantity: 0,
  total: 0,
});

const getInitialUserState = () => null; // or whatever your user initial state is

// Load and validate cart state from localStorage
const loadCartState = () => {
  const savedCart = loadStateFromLocalStorage("cart");
  
  // If no saved cart or saved cart is invalid, return undefined to use reducer's initial state
  if (!savedCart) {
    return undefined;
  }
  
  // Validate that saved cart has the required structure
  if (!savedCart.products || !Array.isArray(savedCart.products)) {
    console.warn("Invalid cart state found in localStorage, using default");
    return undefined;
  }
  
  return savedCart;
};

// Load and validate user state from localStorage
const loadUserState = () => {
  const savedUser = loadStateFromLocalStorage("user");
  
  // Validate user state if needed
  if (!savedUser) {
    return undefined;
  }
  
  return savedUser;
};

// Create preloaded state with validation
const preloadedState = {
  user: loadUserState(),
  cart: loadCartState(),
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState, // This will merge with reducer's initial state
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// Listen for state changes and persist to localStorage
store.subscribe(() => {
  try {
    const state = store.getState();
    
    // Only persist cart if it's valid
    if (state.cart && state.cart.products && Array.isArray(state.cart.products)) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    } else {
      // If cart is invalid, clear localStorage to prevent issues
      localStorage.removeItem("cart");
    }
    
    // Persist user state if needed
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  } catch (error) {
    console.error("Could not save state to localStorage", error);
  }
});

export default store;