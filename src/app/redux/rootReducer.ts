import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import friendReducer from "./slices/friendSlice";

const rootReducer = combineReducers({
  user: userReducer,
  friend: friendReducer,
});

export default rootReducer;
