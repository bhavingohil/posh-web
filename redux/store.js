import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./features/filters";
import cartValueReducer from "./features/cart";

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    cartValue: cartValueReducer,
  },
});
