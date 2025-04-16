import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null ,
};

export const spotSlice = createSlice({
  name: "spot",
  initialState,
  reducers: {
    updateSpot: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateSpot } = spotSlice.actions;
export default spotSlice.reducer;
