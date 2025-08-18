import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserType = {
  _id: string;
  name: string;
  email: string;
  profile: string | null;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  role: "recruiter" | "candidate";
};

type UserStateType = {
  currentUser: UserType | null;
  error: string | null;
  loading: boolean;
};

const initialState: UserStateType = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action: PayloadAction<UserType>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { signInSuccess } = userSlice.actions;
export default userSlice.reducer;
