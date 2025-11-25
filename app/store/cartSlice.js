import { createSlice } from "@reduxjs/toolkit";

const cartDataFromLocal = () => {
  if (typeof window === "undefined") return [];

  const storeData = localStorage.getItem("cartItem");
  return storeData ? JSON.parse(storeData) : [];
};



const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItem: cartDataFromLocal(),
  },
  reducers: {
    addCart: (state, action) => {
      const existProduct = state.cartItem.find(
        (elm) => elm.id == action.payload.id
      );
      if (existProduct) {
        state.cartItem = state.cartItem.map((elm) =>
          elm.id == action.payload.id ? { ...elm, qnty: elm.qnty + 1 } : elm
        );
      } else {
        state.cartItem = [...state.cartItem, action.payload];
      }

      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    removeCart: (state, action) => {
      const updateProduct = state.cartItem.filter(
        (elm) => elm.id !== action.payload
      );
      state.cartItem = updateProduct;
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    increQunty: (state, action) => {
      const updateProduct = state.cartItem.map((elm) =>
        elm.id == action.payload ? { ...elm, qnty: elm.qnty + 1 } : elm
      );
      state.cartItem = updateProduct;
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    decareseQunty: (state, action) => {
      const updateProduct = state.cartItem.map((elm) =>
        elm.id == action.payload ? { ...elm, qnty: elm.qnty - 1 } : elm
      );
      state.cartItem = updateProduct.filter((elm) => elm.qnty > 0);
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
  },
});

export const { addCart, removeCart, increQunty, decareseQunty } =
  cartSlice.actions;
export default cartSlice.reducer;
