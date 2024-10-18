"use client";
import React, { Fragment } from "react";
import SearchBar from "./SearchBar";
import UserIntro from "./UserIntro";
import {
  useAddNewFriendMutation,
  useGetAllUsersQuery,
} from "@/lib/stateManager/services/users.service";
import { IUser } from "@/lib/utilis/interfaces";
import { CurrentUserActions } from "@/lib/stateManager/features/currentUser.slice";
import { useAppDispatch, useAppSelector } from "@/lib/stateManager/hooks";

function NewChat({ onHideNewChatModal }: { onHideNewChatModal?: () => void }) {
  const { data: users } = useGetAllUsersQuery("");
  const currentUser = useAppSelector((state) => state.currentUser);
  const dispatch = useAppDispatch();
  const [addNewFriend] = useAddNewFriendMutation();

  const registeredUsersWithoutCurrentUser = users?.filter(
    (user: IUser) =>
      user._id != currentUser._id && !currentUser.friends.includes(user._id)
  );

  const sortedUsers = registeredUsersWithoutCurrentUser.sort(
    (userInfo1: IUser, userInfo2: IUser) =>
      userInfo1.userName.toLowerCase() < userInfo2.userName.toLowerCase()
        ? -1
        : 1
  );

  const handleAddFriend = (id: string) => {
    dispatch(CurrentUserActions.addNewFriend({ userId: id }));
    onHideNewChatModal && onHideNewChatModal();

    if (!currentUser.friends.includes(id)) {
      addNewFriend({ userId: currentUser._id, friendId: id });
    }
  };

  return (
    <>
      <SearchBar
        text="New Chat"
        textStyle="text-2xl lg:text-xl lg:-mt-3  mb-1"
        searchBarPlaceHolder="Search username or email address"
      />
      {/* <div className="flex items-center gap-2 p-2   mb-5 cursor-pointer hover:bg-black hover:bg-opacity-10 rounded">
        <UserPlusIcon className="w-5  rounded-full cursor-pointer" />
        <p>Add new friend</p>
      </div> */}

      {/* <UserIntro
        name={currentUser.userName}
        image={currentUser.profileImage}
        numOfUnreadMessages={0}
        time={""}
        lastMessage={""}
        friendId={currentUser._id}
        action={() => handleAddFriend(currentUser._id)}
      /> */}

      {sortedUsers?.map((user: IUser) => {
        return (
          <Fragment key={user._id}>
            <UserIntro
              name={user.userName}
              image={user.profileImage}
              numOfUnreadMessages={0}
              time={""}
              lastMessage={""}
              friendId={user._id}
              action={() => handleAddFriend(user._id)}
            />
          </Fragment>
        );
      })}
    </>
  );
}

export default NewChat;
