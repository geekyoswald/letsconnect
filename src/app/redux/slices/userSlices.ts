"use client";

import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  // userId: Number(localStorage.getItem("id")),
  // username: localStorage.getItem("username"),
  userId: 0,
  username: "dummy",
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    updateUser: (state, action) => {
      state.userId = action.payload.id;
      state.username = action.payload.name;
    },
    logout: (state) => {
      state.userId = 0;
      state.username = "dummy";
    },
  },
});

export interface userState {
  userId: number;
  username: string;
}

export const { updateUser, logout } = userSlice.actions;

export default userSlice.reducer;
