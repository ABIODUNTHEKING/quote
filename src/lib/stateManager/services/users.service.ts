import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UsersService = createApi({
  reducerPath: "UsersService",
  baseQuery: fetchBaseQuery({ baseUrl: "https://quote-backend-knvu.onrender.com/api/users/" }),
  endpoints: (builder) => ({
    getUserByEmailAndPassword: builder.mutation({
      query: ({ email, password }) => ({
        url: "getUserByEmailAndPassword",
        method: "POST",
        body: { email, password },
      }),
    }),
    getAllUsers: builder.query({
      query: () => "",
    }),
    createUser: builder.mutation({
      query: ({ userData }) => ({
        url: "",
        method: "POST",
        body: userData,
      }),
    }),
    addNewFriend: builder.mutation({
  
      query: ({ userId, friendId }) => ({
        url: "addNewFriend",
        method: "PUT",
        body: { userId, friendId },
      }),
    }),
  }),
});

export const {
  useGetUserByEmailAndPasswordMutation,
  useGetAllUsersQuery,
  useCreateUserMutation,
  useAddNewFriendMutation
} = UsersService;
