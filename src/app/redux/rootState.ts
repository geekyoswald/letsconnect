import { friendState } from "./slices/friendSlice";
import { userState } from "./slices/userSlices";

export interface rootState {
  user: userState;
  friend: friendState;
}
