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
    isCartOpen: false,
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
    setCartItems: (state, action) => {
      // Handle null/undefined or non-array
      if (!action.payload || !Array.isArray(action.payload)) {
        state.cartItem = [];
        localStorage.setItem("cartItem", JSON.stringify([]));
        return;
      }

      // Handle empty array
      if (action.payload.length === 0) {
        state.cartItem = [];
        localStorage.setItem("cartItem", JSON.stringify([]));
        return;
      }

      // Transform server cart data to match Redux cart structure
      // Server returns: { cart_id, product_id, quantity, total_price, name, images, ... }
      // Redux expects: { id, qnty, ... }
      const transformedItems = action.payload.map((item) => ({
        id: item.product_id || item.id,
        qnty: item.quantity || item.qnty || 1,
        ...item, // Preserve all original fields from server
      }));
      state.cartItem = transformedItems;
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    openCartDrawer: (state) => {
      state.isCartOpen = true;
    },
    closeCartDrawer: (state) => {
      state.isCartOpen = false;
    },
  },
});

export const {
  addCart,
  removeCart,
  increQunty,
  decareseQunty,
  setCartItems,
  openCartDrawer,
  closeCartDrawer,
} = cartSlice.actions;
export default cartSlice.reducer;
