import { createSlice } from "@reduxjs/toolkit";

const wishDataFromLocal = () => {
  if (typeof window === "undefined") return [];

  const storeData = localStorage.getItem("wishlist");
  return storeData ? JSON.parse(storeData) : [];
};

const WishListSlice = createSlice({
  name: "wishList",
  initialState: {
    wishlist: wishDataFromLocal(),
  },
  reducers: {
    addWish: (state, action) => {
      const existProduct = state.wishlist.find(
        (elm) => elm.id === action.payload.id
      );
      if (!existProduct) {
        state.wishlist = [
          ...state.wishlist,
          { ...action.payload, wishAdd: true },
        ];
      }
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },

    removeWish: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (elm) => elm.id !== action.payload.id
      );
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },

    clearWishlist: (state) => {
      state.wishlist = [];
      localStorage.setItem("wishlist", JSON.stringify([]));
    },
  },
});

export const { addWish, removeWish, clearWishlist } = WishListSlice.actions;
export default WishListSlice.reducer;
