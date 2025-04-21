import { createSlice } from "@reduxjs/toolkit";

const initialState = Object.freeze({
  value: [],
});

export const tricksSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleTrick: (state, action) => {
      state.value.includes(action.payload)
        ? (state.value = state.value.filter(
            (element) => element != action.payload
          ))
        : (state.value = Array.from(new Set([...state.value, action.payload])));
    },
  },
});

export const { toggleTrick } = tricksSlice.actions;
export default tricksSlice.reducer;
