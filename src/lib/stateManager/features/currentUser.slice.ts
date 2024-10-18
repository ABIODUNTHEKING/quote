import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/lib/utilis/interfaces";

const initialState: IUser = {
  _id: "",
  createdAt: "",
  friends: [],
  profileImage: "",
  updatedAt: "",
  userName: "",
  email: "",
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    getUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    addNewFriend: (state, action) => {
      if (state.friends.includes(action.payload.userId)) {
        return state;
      }
      state.friends.push(action.payload.userId);
    },
  },
});

export const { reducer, actions: CurrentUserActions } = currentUserSlice;
