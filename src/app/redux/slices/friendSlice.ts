import { createSlice } from "@reduxjs/toolkit";

const friendInitialState = {
  friendId: 2,
  friendName: "friend",
};

const friendSlice = createSlice({
  name: "friend",
  initialState: friendInitialState,
  reducers: {
    updateFriend: (state, action) => {
      state.friendId = action.payload.friendId; // Use friendId here
      state.friendName = action.payload.friendName; // Use friendName here
    },
    resetFriend: (state) => {
      state.friendId = 2;
      state.friendName = "friend";
    },
  },
});

export interface friendState {
  friendId: number;
  friendName: string;
}

export const { updateFriend, resetFriend } = friendSlice.actions;

export default friendSlice.reducer;
