import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiFetch } from "../../lib/fetch";
import type {
  GetMessageOfUserSelectedResponse,
  Message,
  SendMessageToSelectedUserResponseType,
  SidebarUsersResponseType,
  SidebarUserType,
} from "../../types/api.type";
import type { RootState } from "../store";

interface MessageState {
  messages: Message[];
  users: SidebarUserType[];
  selectedUser: SidebarUserType | null;
  conversationId: string | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
}

const initialState: MessageState = {
  messages: [],
  users: [],
  selectedUser: null,
  conversationId: null,
  isMessagesLoading: false,
  isUsersLoading: false,
};

export const fetchMessageOfSelectedUser = createAsyncThunk<
  GetMessageOfUserSelectedResponse,
  { conversationId: string | null; userToChatId: string }
>("message/fetchMessageOfSelectedUser", async ({ conversationId, userToChatId }, thunkAPI) => {
  try {
    if (!conversationId) {
      return thunkAPI.rejectWithValue("first-message");
    }

    return apiFetch<GetMessageOfUserSelectedResponse>(
      `/message/${conversationId}/get/${userToChatId}`,
      {
        auth: true,
      }
    );
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || "Failed to fetch user message");
  }
});

export const sendMessageToSelectedUser = createAsyncThunk<
  SendMessageToSelectedUserResponseType,
  { text: string }
>("message/sendMessageToSelectedUser", async (data: { text: string }, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const selectedUser = state.message.selectedUser;

  if (!selectedUser || !selectedUser.userId) {
    return thunkAPI.rejectWithValue("No user selected");
  }

  const { userId: receiverId } = selectedUser;

  if (!receiverId) {
    return thunkAPI.rejectWithValue("No user selected");
  }

  return apiFetch<SendMessageToSelectedUserResponseType>(`/message/send/${receiverId}`, {
    method: "POST",
    body: JSON.stringify(data),
    auth: true,
  });
});

export const fetchUsersForSidebar = createAsyncThunk<SidebarUsersResponseType, void>(
  "message/fetchUsersForSidebar",
  async (_, thunkAPI) => {
    try {
      return apiFetch<SidebarUsersResponseType>("/conversation/sidebar/users", {
        auth: true,
      });
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch users for sidebar");
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setSelectedUserFromSidebar: (state, action) => {
      if (action.payload === null) {
        state.selectedUser = null;
        state.conversationId = null;
        return;
      }

      const { user } = action.payload;
      // update selectedUser
      state.selectedUser = user;
      if (user.conversationId) {
        state.conversationId = user.conversationId;
      }
    },

    setSelectedUser: (state, action) => {
      const { user } = action.payload;
      const foundUser = state.users.find((u) => u.userId === user._id);
      if (foundUser) {
        // user exists in sidebar list
        state.selectedUser = foundUser;
        state.conversationId = foundUser.conversationId;
      } else {
        // first time selecting this user
        state.selectedUser = {
          conversationId: null,
          userId: user._id,
          name: user.name,
          profilePicture: user.profilePicture,
        };
        state.conversationId = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // 📌 fetchMessageOfSelectedUser
      .addCase(fetchMessageOfSelectedUser.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(fetchMessageOfSelectedUser.fulfilled, (state, action) => {
        state.isMessagesLoading = false;
        state.messages = action.payload.messages; // assuming API returns { messages: [...] }
      })
      .addCase(fetchMessageOfSelectedUser.rejected, (state, action) => {
        state.isMessagesLoading = false;
        if (action.payload === "first-message") {
          state.messages = [];
        }
      })

      // 📌 sendMessageToSelectedUser
      .addCase(sendMessageToSelectedUser.pending, (state) => {
        state.isMessagesLoading = false;
      })
      .addCase(sendMessageToSelectedUser.fulfilled, (state, action) => {
        state.isMessagesLoading = false;

        // update messages list
        state.messages.push(action.payload.newMessage);

        // update conversationId if it was null (first chat case)
        if (!state.conversationId) {
          state.conversationId = action.payload.conversationId;
          if (state.selectedUser) {
            state.selectedUser.conversationId = action.payload.conversationId;
          }
        }
      })
      .addCase(sendMessageToSelectedUser.rejected, (state, action) => {
        state.isMessagesLoading = false;
        console.error("Failed to send message", action.payload);
      })

      // 📌 fetchUsersForSidebar
      .addCase(fetchUsersForSidebar.pending, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(fetchUsersForSidebar.fulfilled, (state, action) => {
        state.isUsersLoading = false;

        const fetchedUsers = action.payload.sidebarUsers;

        // Start fresh with fetched users
        state.users = fetchedUsers;

        // If selectedUser exists but is not in fetched list → add it manually
        if (state.selectedUser) {
          const exists = fetchedUsers.some((u) => u.userId === state.selectedUser?.userId);

          if (!exists) {
            state.users.push({
              conversationId: state.selectedUser.conversationId,
              userId: state.selectedUser.userId as string,
              name: state.selectedUser.name as string,
              profilePicture: state.selectedUser.profilePicture as string,
            });
          }
        }
      })

      .addCase(fetchUsersForSidebar.rejected, (state, action) => {
        state.isUsersLoading = false;
        console.error("Failed to fetch sidebar users", action.payload);
      });
  },
});

export const { setSelectedUserFromSidebar, setSelectedUser } = messageSlice.actions;
export default messageSlice.reducer;
