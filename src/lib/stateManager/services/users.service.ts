import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UsersService = createApi({
  reducerPath: "UsersService",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_URL}/api/users/`,
  }),
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
  useAddNewFriendMutation,
} = UsersService;
