import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messagesService = createApi({
  reducerPath: "messagesService",
  baseQuery: fetchBaseQuery({ baseUrl: "https://quote-backend-knvu.onrender.com/api/chats/" }),
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: ({ messageData }) => ({
        url: `/`,
        method: "POST",
        body: messageData,
      }),
    }),
    getAllMessages: builder.query({
      query: () => "/",
    }),
    getUserMessages: builder.query({
      query: (userId) => `/${userId}`,
    }),
    updateUserAndFriendMessages: builder.mutation({
      query: ({ roomId, message }) => ({
        url: `/${roomId}`,
        method: "POST",
        body: message,
      }),
    }),
    seenMessage: builder.mutation({
      query: ({ id, receiverId }) => ({
        url: `/${id}?receiverId=${receiverId}`,
        method: "PUT",
      }),
    }),

    deleteMessageFromChat: builder.mutation({
      query: ({ messageId, chatId }) => ({
        url: `/deleteOneMessageFromChat?chatId=${chatId}&messageId=${messageId}`,
        method: "DELETE",
      }),
    }),
    deleteMessageForOneUser: builder.mutation({
      query: ({ messageId, chatId, userId }) => ({
        url: `/deleteMessageForOneUser?chatId=${chatId}&messageId=${messageId}&userId=${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllMessagesQuery,
  useGetUserMessagesQuery,
  useUpdateUserAndFriendMessagesMutation,
  useCreateMessageMutation,
  useSeenMessageMutation,
  useDeleteMessageFromChatMutation,
  useDeleteMessageForOneUserMutation
} = messagesService;
