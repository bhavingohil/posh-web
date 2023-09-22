import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    addFilter: (state, action) => {

      let index = state.value[action.payload.filter]?.indexOf(
        action.payload.value
      );
      if (index > -1) {
        state.value[action.payload.filter].splice(index, 1);
      } else {
        let temp = { ...state.value };
        if (temp[action.payload.filter]) {
          temp[action.payload.filter].push(action.payload.value);
        } else {
          temp[action.payload.filter] = new Array();
          temp[action.payload.filter].push(action.payload.value);
        }
        state.value = temp;
      }
    },
    removeFilter: (state, action) => {
      let index = state.value[action.payload.filter]?.indexOf(
        action.payload.value
      );
      if (index > -1) {
        state.value[action.payload.filter].splice(index, 1);
      }
    },
  },
});

export const { addFilter, removeFilter } = filterSlice.actions;
export default filterSlice.reducer;
