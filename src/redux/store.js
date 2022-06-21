import { configureStore } from "@reduxjs/toolkit";
import filter from "./Slices/FilterSlice";

export const store = configureStore({
  reducer: {
    filter,
  },
});