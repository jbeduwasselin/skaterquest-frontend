import { createSlice } from "@reduxjs/toolkit";

const initialState = Object.freeze({
  value: { token: null, username: null, email: null, uID: null },
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action de connexion
    login: (state, action) => {
      const { token, username, email, uID } = action.payload;

      state.value = {
        token,
        username,
        email,
        uID,
      };
    },
    // Action de déconnexion
    logout: (state) => {
      state.value = initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
