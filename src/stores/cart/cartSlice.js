import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let flag = true;
      state.products.forEach((product) => {
        if (product._id === action.payload._id) {
          flag = false;
          product.amount += 1;
        }
      });

      if (flag) {
        state.products.push({ ...action.payload, amount: 1 });
      }
    },

    clearCart: () => {
      return { products: [] };
    },

    incrementProductAmount: (state, action) => {
      return {
        products: state.products.map((product) =>
          product._id === action.payload._id
            ? { ...product, amount: product.amount + 1 }
            : product
        ),
      };
    },

    decrementProductAmount: (state, action) => {
      return {
        products: state.products.map((product) =>
          product._id === action.payload._id
            ? { ...product, amount: product.amount - 1 }
            : product
        ),
      };
    },
  },
});

export const cartProducts = (state) => state.cart.products;

export const {
  addToCart,
  clearCart,
  incrementProductAmount,
  decrementProductAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
