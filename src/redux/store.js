import { configureStore } from "@reduxjs/toolkit";
import filter from "./Slices/FilterSlice";
import cart from "./Slices/CartSlice";

export const store = configureStore({
  reducer: {
    filter,
    cart,
  },
});
