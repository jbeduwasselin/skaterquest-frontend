import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, username: null, avatar: null }, // ajout avatar
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action de connexion
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      if (action.payload.avatar) {
        state.value.avatar = action.payload.avatar; //  gère l'avatar si dispo
      }
    },
    // Action de déconnexion
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.avatar = null; // reset avatar aussi
    },
    // Action de mise à jour de l'avatar
    updateAvatar: (state, action) => {
      state.value.avatar = action.payload;
    },
  },
});

export const { login, logout, updateAvatar } = userSlice.actions;
export default userSlice.reducer;
