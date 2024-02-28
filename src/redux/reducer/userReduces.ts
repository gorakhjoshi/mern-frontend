import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../../types/ReducerTypes";
import { User } from "../../types/types";

// Setting initial state for user
const initialState: UserReducerInitialState = {
  user: null,
  loading: true,
};
export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userExist: (state, action:PayloadAction<User>) => {
      (state.loading = false), (state.user = action.payload);
    },
    userNotExist: (state) => {
      (state.user = null), (state.loading = false);
    },
  },
});

export const{userExist,userNotExist}=userReducer.actions