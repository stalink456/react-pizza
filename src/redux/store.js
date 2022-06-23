import { configureStore } from "@reduxjs/toolkit";
import filter from "./Slices/FilterSlice";
import cart from "./Slices/CartSlice";
import pizza from "./Slices/PizzaSlice";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});
