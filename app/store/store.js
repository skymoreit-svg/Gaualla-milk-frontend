





import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/cartSlice"

import wishReducer from "../store/wishListSlice"
import user from "../store/userSlice"
const store=configureStore({
  reducer:{
    cart:cartReducer,
    wish:wishReducer,
    user
  }
})


export default store;