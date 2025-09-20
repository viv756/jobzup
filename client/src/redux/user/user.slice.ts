import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { apiFetch } from "../../lib/fetch";
import type { CurrentUserResponseType, UserType } from "../../types/api.type";

type UserStateType = {
  currentUser: UserType | null;
  error: string | null;
  loading: boolean;
};

const initialState: UserStateType = {
  currentUser: null,
  error: null,
  loading: true,
};

// thunk to fetch current user
export const fetchCurrentUser = createAsyncThunk<CurrentUserResponseType>(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      return await apiFetch<CurrentUserResponseType>("/user/current", { auth: true });
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action: PayloadAction<UserType>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateCurrentUser: (state, action: PayloadAction<UserType>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.currentUser = null;
        state.error = action.payload as string;
      });
  },
});

export const { signInSuccess, logout, updateCurrentUser } = userSlice.actions;
export default userSlice.reducer;
