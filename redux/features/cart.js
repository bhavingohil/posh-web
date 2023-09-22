import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const cartSlice = createSlice({
  name: "cartValue",
  initialState,
  reducers: {
    incrementNumber: (state) => {
      if (!state.value?.numberOfProducts) {
        state.value.numberOfProducts = 1;
      } else {
        state.value.numberOfProducts++;
      }
    },
    decrementNumber: (state) => {
      if (state.value.numberOfProducts !== 0) {
        state.value.numberOfProducts--;
      }
    },
    updateValue: (state, action) => {
      if (state.value.cartValue) {
        state.value.cartValue += action.payload;
      } else {
        state.value.cartValue = action.payload;
      }
    },
  },
});

export const { incrementNumber, decrementNumber, updateValue } =
  cartSlice.actions;
export default cartSlice.reducer;
