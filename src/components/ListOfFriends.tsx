"use client";
import React, { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import { useCombineFriendsDetails } from "@/lib/customHooks/useCombineFriendDetails";
import { useAppSelector } from "@/lib/stateManager/hooks";
import { socket } from "@/lib/utilis/socket";
import UserIntro from "./UserIntro";
import { useParams } from "next/navigation";
import sortFriendBasedOnLastUpdatedMessage from "@/lib/utilis/sortFriendBasedOnLastUpdatedMessage";
import { determineLastMessageInfo } from "@/lib/utilis/determineLastMessageInfo";
import { ChatBubbleLeftIcon, UserPlusIcon } from "@heroicons/react/24/outline";

import NewChat from "./NewChat";
import useDeactivateMenuOnTouchOutside from "@/lib/customHooks/useDeactivateOnTouchOutsideMenu";
import Link from "next/link";
import AddFriendPrompt from "./AddFriendPrompt";

function ListOfFriends() {
  const friendFullDetails = useCombineFriendsDetails();
  const currentUser = useAppSelector((state) => state.currentUser);
  const { slug: selectedFriendId } = useParams();
  const [isAddFriendModalVisible, setIsAddFriendModalVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useDeactivateMenuOnTouchOutside({
    menuRef,
    closeMenu: () => setIsAddFriendModalVisible(false),
  });

  useEffect(() => {
    const senderId = currentUser._id;

    friendFullDetails.forEach((friend) => {
      const receiverId = friend.id;
      socket.emit("join room", { senderId, receiverId });
    });
  }, [currentUser._id, friendFullDetails]);

  const sortedFriend = sortFriendBasedOnLastUpdatedMessage(friendFullDetails);

  return (
    <div
      className={`px-2 overflow-y-scroll w-full  h-svh hide_scroll_bar relative ${
        selectedFriendId ? "hidden lg:block" : ""
      }`}
      onContextMenu={(e) => e.preventDefault()}
    >
      <SearchBar
        text="Chat"
        textStyle="text-2xl mb-1"
        searchBarPlaceHolder="Search or start a new chat"
      />

      {sortedFriend.length != 0 ? (
        sortedFriend.map((friend) => {
          const { time, lastMessage, unreadMessage } = determineLastMessageInfo(
            {
              friend,
              currentUserId: currentUser._id,
            }
          );

          return (
            <Fragment key={friend.messageId}>
              {friend.messages.length && (
                <UserIntro
                  name={friend.username}
                  image={friend.profileImage}
                  numOfUnreadMessages={unreadMessage.length}
                  time={time}
                  lastMessage={lastMessage}
                  friendId={friend.id}
                />
              )}
            </Fragment>
          );
        })
      ) : (
        <AddFriendPrompt />
      )}

      <div ref={menuRef}>
        <ChatBubbleLeftIcon
          className="absolute bottom-24 right-3 lg:bottom-3 w-10 bg-green-10 hidden lg:block text-white p-2 rounded-full z-50 cursor-pointer"
          onClick={() => setIsAddFriendModalVisible((prevValue) => !prevValue)}
        />
        <Link href="/new-chat">
          <ChatBubbleLeftIcon className="absolute bottom-24 right-3 lg:bottom-3 w-10 block lg:hidden bg-green-10 text-white p-2 rounded-full cursor-pointer" />
        </Link>

        {isAddFriendModalVisible && (
          <div className="absolute bg-white shadow p-3  overflow-y-scroll hide_scroll_bar w-full  hidden lg:block rounded-xl z-40 lg:top-0 right-0 h-full  lg:bottom-16 ">
            <NewChat onHideNewChatModal={() => setIsAddFriendModalVisible(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ListOfFriends;
