import { createSlice } from "@reduxjs/toolkit";
import { IChat } from "@/lib/utilis/interfaces";

const initialState: IChat[] = [];

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addAllMessage: (_state, action) => {
      return action.payload;
    },
    updateMessage: (state, action) => {
      const usersId = action.payload.roomId.split("_");
      const existingMessageEntry = state.find(
        (chat) =>
          chat.roomId.includes(usersId[0]) && chat.roomId.includes(usersId[1])
      );

      if (existingMessageEntry) {
        existingMessageEntry.messages.push(action.payload.messages);
      } else {
        state.push({
          _id: action.payload.id,
          roomId: action.payload.roomId,
          messages: [action.payload.messages],
        });
      }
    },
    seenMessage: (state, action) => {
      const selectedMessages = state.find(
        (msgInfo) =>
          msgInfo.roomId.includes(action.payload.userId) &&
          msgInfo.roomId.includes(action.payload.friendId)
      );
      if (selectedMessages) {
        selectedMessages.messages.forEach((msg) => (msg.seen = true));
      }
    },
    deleteMessage: (state, action) => {
      const updatedMessages = state.map((chat) => {
        if (chat.roomId == action.payload.messageRoomId) {
          return {
            ...chat,
            messages: chat.messages.filter(
              (msg) => msg._id !== action.payload.messageId
            ),
          };
        }

        return chat;
      });
      return updatedMessages;
    },
  },
});

export const { actions, reducer } = messagesSlice;
