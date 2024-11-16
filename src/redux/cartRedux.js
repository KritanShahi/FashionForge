// redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    incrementQuantity: (state, action) => {
      const product = state.products.find((p) => p._id === action.payload);
      if (product) {
        product.quantity += 1;
        state.total += product.price;
      }
    },
    decrementQuantity: (state, action) => {
      const product = state.products.find((p) => p._id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        state.total -= product.price;
      } else if (product && product.quantity === 1) {
        // Remove the product from the cart if quantity goes to zero
        state.products = state.products.filter((p) => p._id !== action.payload);
        state.total -= product.price;
      }
    },
  },
});

export const { addProduct, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     products: [],
//     quantity: 0,
//     total: 0,
//   },
//   reducers: {
//     addProduct: (state, action) => {
//       state.quantity +=1 ;
//       state.products.push(action.payload);
//       state.total += action.payload.price*action.payload.quantity ;
//     },
//   },
// });

// export const { addProduct } = cartSlice.actions;
// export default cartSlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     products: [],
//     quantity: 0,
//     total: 0,
//   },
//   reducers: {
//     addProduct: (state, action) => {
//       const existingProduct = state.products.find(
//         (product) => product._id === action.payload._id
//       );
//       if (existingProduct) {
//         // Increment quantity if product already exists
//         existingProduct.quantity += action.payload.quantity;
//       } else {
//         // Add new product to cart
//         state.products.push(action.payload);
//       }
//       state.quantity += action.payload.quantity;
//       state.total += action.payload.price * action.payload.quantity;
//     },

//     incrementQuantity: (state, action) => {
//       const product = state.products.find(
//         (product) => product._id === action.payload
//       );
//       if (product) {
//         product.quantity += 1;
//         state.quantity += 1;
//         state.total += product.price;
//       }
//     },

//     decrementQuantity: (state, action) => {
//       const product = state.products.find(
//         (product) => product._id === action.payload
//       );
//       if (product && product.quantity > 1) {
//         product.quantity -= 1;
//         state.quantity -= 1;
//         state.total -= product.price;
//       } else if (product && product.quantity === 1) {
//         // Remove product from cart if quantity is 1 and decrement action is triggered
//         state.products = state.products.filter(
//           (product) => product._id !== action.payload
//         );
//         state.quantity -= 1;
//         state.total -= product.price;
//       }
//     },

//     removeProduct: (state, action) => {
//       const product = state.products.find(
//         (product) => product._id === action.payload
//       );
//       if (product) {
//         state.quantity -= product.quantity;
//         state.total -= product.price * product.quantity;
//         state.products = state.products.filter(
//           (product) => product._id !== action.payload
//         );
//       }
//     },

//     clearCart: (state) => {
//       state.products = [];
//       state.quantity = 0;
//       state.total = 0;
//     },
//   },
// });

// export const {
//   addProduct,
//   incrementQuantity,
//   decrementQuantity,
//   removeProduct,
//   clearCart,
// } = cartSlice.actions;
// export default cartSlice.reducer;
